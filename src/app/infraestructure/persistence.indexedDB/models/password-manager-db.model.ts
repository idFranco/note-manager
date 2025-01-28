import { environment } from "../../../../environments/environment";
import { MasterPasswordManagerDB } from "./master-password-manager-db.model";

const NOTE_STORE_NAME = environment.databaseConfig.storeNameNote;

export interface PasswordManagerDB extends MasterPasswordManagerDB {
  NOTE_STORE_NAME: {
    key: number;
    value: {
      title: string;
      password: string;
      notes?: string;
    };
  };
}
