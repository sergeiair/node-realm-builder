
export const propertyValidatorSchema = {
  'id': '/propertiesSchema',
  'type': 'object',
  'properties': {
    'name': {'type': 'string', 'minLength': 1},
    'type': {'type': 'string', 'minLength': 3},
  }
};

export const mainValidatorSchema = {
  'id': '/mainSchema',
  'type': 'object',
  'properties': {
    'name': {'type': 'string', 'minLength': 1},
    'primaryKey': {'type': 'string', 'minLength': 1},
    'properties': {
      'type': 'array',
      'items': {"$ref": "/propertiesSchema"},
    }
  }
};
