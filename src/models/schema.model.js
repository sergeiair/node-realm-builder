
import PropertyModel from './property.model';

export default class SchemaModel {
  _name = null;
  _primaryKey = null;
  _properties = null;

  constructor(data = {}) {
    this._name = data.name || '';
    this._primaryKey = data.primaryKey || null;
    this._properties = data.properties || [ new PropertyModel().params ];
  }

  get schema() {
    return {
      name: this._name,
      primaryKey: this._primaryKey,
      properties: this._properties,
    };
  }
}
