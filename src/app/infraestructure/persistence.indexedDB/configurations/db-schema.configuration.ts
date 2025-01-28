import { environment } from "../../../../environments/environment";

export const DBSchemaConfig = {
  name:  environment.databaseConfig.name,
  loginStoreName: environment.databaseConfig.storeNameLogin,
  noteName: environment.databaseConfig.storeNameNote,
  version: environment.databaseConfig.version,
};
