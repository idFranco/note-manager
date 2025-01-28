import { Injectable } from '@angular/core';
import { IDBManagerService } from './IDB-manager.service';
import { NotepadModel } from '../../../core/models/notepad';

@Injectable({
  providedIn: 'root'
})
export class IDBNoteService extends IDBManagerService {

  constructor() {
    super();
  }

  async add(passwordFile: NotepadModel): Promise<number> {
    const store = await this.readWriteConfigurationDB(this._dbSchemaConfig.noteName);

    return new Promise((resolve, reject) => {

      let title = passwordFile.title;
      let password = passwordFile.password;
      let notes = passwordFile.notes;

      const request = store.add({ title, password, notes });

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async update(passwordFile: NotepadModel): Promise<void> {
    const store = await this.readWriteConfigurationDB(this._dbSchemaConfig.noteName);

    return new Promise((resolve, reject) => {

      let id = passwordFile.id;
      let title = passwordFile.title;
      let password = passwordFile.password;
      let notes = passwordFile.notes;

      const request = store.put({id, title, password, notes });

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async delete(id: number): Promise<void> {
    const store = await this.readWriteConfigurationDB(this._dbSchemaConfig.noteName);

    return new Promise((resolve, reject) => {

      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getPassword(id: number): Promise<string> {
    const store = await this.readOnlyConfigurationDB(this._dbSchemaConfig.noteName);

    return new Promise(async (resolve, reject) => {

      const request = store.get(id);

      request.onsuccess = async () => {
        const result = request.result;
        if (result) {
          resolve(result.password);
        } else {
          reject('Password not found');
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getAll(): Promise<any[]> {
    const store = await this.readOnlyConfigurationDB(this._dbSchemaConfig.noteName);

    return new Promise((resolve, reject) => {

      const request = store.getAll();

      request.onsuccess = async () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

}
