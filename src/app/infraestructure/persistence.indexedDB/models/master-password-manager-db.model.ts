import { DBSchema } from "idb";
import { environment } from "../../../../environments/environment";

const LOGIN_STORE_NAME = environment.databaseConfig.storeNameLogin;

export interface MasterPasswordManagerDB extends DBSchema {
  LOGIN_STORE_NAME: {
    key: string;
    value: {
      username: string;
      password: string;
    };
  };
}
