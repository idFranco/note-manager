import { CredentialModel } from "../models/credential.model";

export function credentialModelHelper(e: any): CredentialModel {

    const credential = new CredentialModel();
    credential.username = e.username;
    credential.password = e.password;
    return credential;
  }
