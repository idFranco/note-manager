import { Injectable } from '@angular/core';
import { IDBManagerService } from './IDB-manager.service';
import { MessageErrorEnum } from '../../../core/enums/message-error.enum';

@Injectable({
  providedIn: 'root'
})
export class IDBCredentialService extends IDBManagerService {

  constructor() {
    super();
  }

  async isMasterPasswordSet(): Promise<boolean> {
    const store = await this.readOnlyConfigurationDB(this._dbSchemaConfig.loginStoreName);
    return new Promise((resolve, reject) => {

      const request = store?.get(this._dbSchemaConfig.loginStoreName);

      request.onsuccess = () => {
        resolve(request.result !== undefined);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getLoginCredential(): Promise<{ username: string; password: string }> {
    const store = await this.readOnlyConfigurationDB(this._dbSchemaConfig.loginStoreName);

    return new Promise(async (resolve, reject) => {

      const request = store.get(this._dbSchemaConfig.loginStoreName);

      request.onsuccess = () => {
        let result = request.result;
        if (result) {
          resolve(result);
        } else {
          reject({
            username: '',
            password: '',
            message: MessageErrorEnum.NOT_FOUND_IDENTIFY
          });
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async setMasterPassword(username: string, password: string): Promise<boolean> {
    const store = await this.readWriteConfigurationDB(this._dbSchemaConfig.loginStoreName);

    return new Promise((resolve, reject) => {

      const request = store.put({ username, password }, this._dbSchemaConfig.loginStoreName);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

}
