
const env = require(`../environments/${process.env.REACT_APP_ENV || 'prod'}`);

export const CANCELLATION_ACTION_URL = env.CANCELLATION_ACTION_URL;
export const CANCELLATION_DATA_URL = env.CANCELLATION_DATA_URL;
