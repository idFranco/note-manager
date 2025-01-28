import { Injectable } from '@angular/core';
import { DBSchemaConfig } from '../configurations/db-schema.configuration';

@Injectable({
  providedIn: 'root'
})
export class IDBManagerService {

  private dbPromise: Promise<IDBDatabase>;
  protected readonly _dbSchemaConfig = DBSchemaConfig;

  constructor() {
    this.dbPromise = this.openDatabase();
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbSchemaConfig.name, this._dbSchemaConfig.version);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(this._dbSchemaConfig.noteName, { keyPath: 'id', autoIncrement: true });
        db.createObjectStore(this._dbSchemaConfig.loginStoreName);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private async configurationTransaction(storeName: string, mode: IDBTransactionMode): Promise<IDBObjectStore> {
    const db = await this.dbPromise;

    return new Promise(async (resolve) => {
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      resolve(store);
    });
  }

  protected async readOnlyConfigurationDB(storeName: string): Promise<IDBObjectStore> {
    return await this.configurationTransaction(storeName, 'readonly');
  }

  protected async readWriteConfigurationDB(storeName: string): Promise<IDBObjectStore> {
    return await this.configurationTransaction(storeName, 'readwrite');
  }
}
