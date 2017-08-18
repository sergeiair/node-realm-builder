import axios from 'axios';

import { NotificationManager } from 'react-notifications';

export default class RealmsService {

  static initFile(data) {
    return new Promise((resolve, reject) => {
      axios.post('//localhost:4000/realm-init', data)
        .then(res => {
          resolve();

          NotificationManager.info(res.data.code || res.statusText);
        }).catch((error) => {
          reject();

        if (error.response) {
          NotificationManager.error(error.response.data.code);
        } else {
          NotificationManager.error('Error while creating realm file');
        }
      });
    });
  }

  static writeData(data) {
    return new Promise((resolve, reject) => {
      axios.post('//localhost:4000/realm-write', data)
        .then(res => {
          resolve();

          NotificationManager.info(res.data.code || res.statusText);
        }).catch((error) => {
          reject();

          if (error.response) {
            NotificationManager.error(error.response.data.code);
          } else {
            NotificationManager.error('Error while writing data');
          }
      });
    });
  }
}
