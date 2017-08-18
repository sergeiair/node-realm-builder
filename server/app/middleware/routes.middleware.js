import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';

import RealmProviderService from '../services/storage/realm.provider.service';
import BaseCrudService from '../services/storage/base.crud.service';

const router = new Router();
const koaBody = convert(KoaBody());

const RealmsService = new RealmProviderService();
const RealmCRUDService = new BaseCrudService();

router
  .post('/realm-init', koaBody, async (ctx) => {
    RealmsService
      .resolveProvider(ctx.request.body)
        .then(res => {
          RealmCRUDService.provider = res.provider;
          RealmCRUDService.schemaName = res.schemaName;

          ctx.status = 201;
          ctx.body = {code: 'realms.init.done', body: res.schemaName};
        })
        .catch(e => {
          ctx.status = 500;
          ctx.body = {code: 'realms.init.fail', body: e};
        });
  })
  .post('/realm-write', koaBody, async (ctx) => {
    RealmCRUDService.insert(ctx.request.body)
      .then(res => {
        ctx.status = 201;
        ctx.body = {code: 'realms.write.done', body: res};
      })
      .catch(e => {
        ctx.status = 500;
        ctx.body = {code: 'realms.write.fail', body: e};
      });
  });

export function routes () { return router.routes(); }
export function allowedMethods () { return router.allowedMethods(); }
