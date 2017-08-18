
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
    Object.keys(this.storage)
      .map(key => JSON.parse(this.storage[key]));
  }
}
