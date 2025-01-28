import { Injectable } from "@angular/core";
import { CryptoESService } from "../../infraestructure/integration.cryptoES/services/crypto-es.service";
import { handleError } from "../handlers/error.handle";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private cryptoService: CryptoESService) {}

  async encrypt(data: string): Promise<[Error | undefined, string]> {
    return await handleError(() => this.cryptoService.encrypt(data), '');
  }

  async decrypt(data: string): Promise<[Error | undefined, string]> {
    return await handleError(() => this.cryptoService.decrypt(data), '');
  }

}
