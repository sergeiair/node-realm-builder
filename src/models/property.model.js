
export const propertyTypes = ['int', 'string', 'bool', 'float', 'double', 'data', 'date', 'list'];

export default class PropertyModel {

  _params = {
    type: null,
    relation: 'one',
  };

  constructor(data = {}) {
    this._params.name = data.name || null;
    this._params.indexed = Boolean(data.indexed);
    this._params.type = data.type || propertyTypes[0];

    if (data.optional) {
      this._params.optional = true;
    }
    if (data.default || data.default === 0) {
      this._params.default = data.default;
    }
  }

  get params() {
    return this._params;
  }
}
