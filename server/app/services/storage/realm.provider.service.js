const Realm = require('realm');
const uuid = require('uuid');

export default class RealmProviderService {

  get provider() {
    return this._provider;
  }

  resolveProvider(schema) {
    Realm.defaultPath = `server/app/_realms/${schema.name || uuid.v1()}`;

    return new Promise((resolve, reject) => {
      try {
        this._provider = new Realm({
          schema: [this.getCleanSchema(schema)],
        });

        resolve({
          provider: this.provider,
          schemaName: schema.name,
        });
      } catch (e) {
        reject(e.message);
      }
    });
  }

  getCleanSchema(rawSchema) {
    return {
      name: rawSchema.name,
      primaryKey: rawSchema.primaryKey,
      properties: rawSchema.properties.reduce((initial, current) => {
        initial[current.name] = current;

        return initial;
      }, {}),
    };
  }
}
