import { Injectable } from "@angular/core";
import { IDBCredentialService } from "../../infraestructure/persistence.indexedDB/services/IDB-credential.service";
import { handleError } from "../handlers/error.handle";

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(private idbCredentialService: IDBCredentialService) {}

  async isMasterPasswordSet(): Promise<[Error | undefined, boolean]> {
      return await handleError(() => this.idbCredentialService.isMasterPasswordSet(), false);
  }

  async getLoginCredential(): Promise<[Error | undefined, { username: string; password: string }]> {
    return await handleError(() => this.idbCredentialService.getLoginCredential(), {username: '', password:''});
  }

  async setMasterPassword(username: string, password: string): Promise<[Error | undefined, boolean]> {
    return await handleError(() => this.idbCredentialService.setMasterPassword(username, password), false);
  }
}
