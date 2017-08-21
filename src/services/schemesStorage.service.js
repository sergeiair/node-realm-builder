
export default class SchemesStorageService {

  static get storage() {
    return window.localStorage;
  }

  static save(schema) {
    this.storage.setItem(
      new Date().valueOf(),
      JSON.stringify(schema),
    );
  }

  static fetch() {
    return Object.keys(this.storage)
      .map(key => {
        return {
          data: JSON.parse(this.storage[key]),
          key: parseInt(key, 10),
        };
      });
  }
}
