import { Injectable } from '@angular/core';
import CryptoES from 'crypto-es';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoESService {

  private secretKey = environment.crypto_key;

  encrypt(data: string): any {
    return CryptoES.AES.encrypt(data, this.secretKey).toString();
  }

  decrypt(data: string): any {
    const bytes = CryptoES.AES.decrypt(data, this.secretKey);
      return bytes.toString(CryptoES.enc.Utf8);
  }
}
