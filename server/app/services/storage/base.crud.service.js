
export default class BaseCrudService {

  get provider() {
    return this._provider;
  }

  set provider(inst) {
    this._provider = inst;
  }

  get schemaName() {
    return this._schemaName;
  }

  set schemaName(name) {
    this._schemaName = name;
  }

  getNextId() {
    let collection = this.provider.objects(this.schemaName).sorted('id');

    return collection.length && collection[collection.length - 1]
      ? collection[collection.length - 1].id + 1
      : 1;
  }

  fetch(filterString = '', sortString = '', toArray = true) {
    return new Promise((resolve, reject) => {
      try {
        let objects = filterString.length
          ? this.provider.objects(this.schemaName)
              .filtered(filterString)
          : this.provider.objects(this.schemaName);

        let objectsSorted = sortString.length
          ? objects.sorted(sortString)
          : objects;

        toArray
          ? resolve({data: objectsSorted.map(el => el),
              name: this.schemaName})
          : resolve({data: objectsSorted,
              name: this.schemaName});
      }
      catch (e) {
        reject(e.message);
      }
    });
  }

  insert(data, update = false) {
    return new Promise((resolve, reject) => {
      try {
        this.provider
          .write(() => {

            if (!Array.isArray(data)) {
              this.provider.create(this.schemaName, data, update);
            } else {
              data.map(item => {
                this.provider.create(this.schemaName, item, update);
              });
            }

            resolve(data);
          });
      }
      catch (e) {
        reject(e.message);
      }
    });
  }

  drop(id, field = 'id') {
    return new Promise((resolve, reject) => {
      try {
        let object = this.provider
          .objects(this.schemaName)
          // TODO add non numeric keys support
          .filtered(`${field}=${id}`);

        this.provider
          .write(() => {
            this.provider.delete(object);
          });
        resolve(id);
      }
      catch (e) {
        reject(e.message);
      }
    });
  }
}
