import { observable, action, computed, runInAction, reaction } from 'mobx';

import SchemaModel from '../models/schema.model';
import PropertyModel from '../models/property.model';

import {
  mainValidatorSchema,
  propertyValidatorSchema,
} from '../constants/json-validation.schemes';

const JSONValidator = require('jsonschema').Validator;

class SchemesStore {

  schemaValidator = new JSONValidator();

  constructor() {
    this.schemaValidator.addSchema(propertyValidatorSchema, '/propertiesSchema');

    reaction(
      () => this.mainSchema.properties[0],
      item => {
        if (this.mainSchema.properties.length === 1) {
          this.mainSchemaPKey = item.name;
        }
      }
    );
  }

  @observable _schemes = {
    mainSchema: {},
    subSchemes: [],
  };

  @computed get mainSchema() {
    return Object.keys(this._schemes.mainSchema).length
      ? this._schemes.mainSchema
      : new SchemaModel().schema;
  }

  set mainSchema(data) {
    if (data.properties.length === 1 && !data.properties[0].name) {
      this._schemes.mainSchema = Object.assign({}, data, {
        primaryKey: null,
      });
    } else {
      this._schemes.mainSchema = data;
    }
  }

  set subSchemes(data) {
    this._schemes.subSchemes = data.map(item =>
      new SchemaModel(item).schema);
  }

  set mainSchemaPKey(key) {
    this._schemes.mainSchema.primaryKey = key;
  }

  @computed get subSchemes() {
    return this._schemes.subSchemes;
  }

  @computed get isSchemaValid() {
    return this.schemaValidator
      .validate(this.mainSchema, mainValidatorSchema)
      .valid;
  }

  getModifiedProperties(data) {
    return this.mainSchema.properties.map((item, index) => {
      return index === data.index
        ? Object.assign({}, item, data.propertyPrm) : item;
    });
  }

  @action addMainSchemaProperty() {
    runInAction('adding new property to main schema', () => {
      this.mainSchema = Object.assign({}, this.mainSchema,
        {
          properties: [
            ...this.mainSchema.properties,
            new PropertyModel().params,
          ],
        }
      );
    });
  }

  @action dropMainSchemaProperty(index) {
    runInAction('removing main schema property', () => {
      this.mainSchema = Object.assign({},
        this._schemes.mainSchema,
        {
          properties: [...this.mainSchema.properties
            .filter((prop, i) => i !== index)],
        }
      );
    });
  }

  @action updateMainSchema(data) {
    runInAction('updating main schema', () => {
      if (data.propertyPrm) {
        this.mainSchema = Object.assign({}, this.mainSchema, {
          properties: this.getModifiedProperties(data),
        });
      } else {
        this.mainSchema = Object.assign({}, this.mainSchema, data);
      }
    });
  }

  @action resetMainSchema() {
    runInAction('resetting main schema', () => {
      this.mainSchema = Object.assign({}, new SchemaModel().schema);
    });
  }
}

export default SchemesStore;
