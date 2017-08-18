import Koa from 'koa';
import cors from 'koa2-cors';
import errorMiddleware from './middleware/error.middleware';
import { routes, allowedMethods } from './middleware/routes.middleware';

const app = new Koa();

app.use(cors());
app.use(errorMiddleware);
app.use(routes());
app.use(allowedMethods());

app.listen(4000, () => {
  console.log('app started...');
});

