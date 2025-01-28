import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { materialImports } from '../../../../material.imports';
import { LoginModel } from '../../../../core/models/login.model';
import { CredentialModel } from '../../../../core/models/credential.model';
import { credentialModelHelper } from '../../../../core/helpers/modeler.helper';
import { CryptoService } from '../../../../core/services/crypto.service';
import { handleMessageError } from '../../../../core/handlers/message-error.handle';
import { CredentialService } from '../../../../core/services/credential.service';

@Component({
  imports: [CommonModule,
            ...materialImports],
  templateUrl: '.././credential.component.html',
  styleUrl: '../.././login.component.scss'
})
export class BaseCredentialComponent {

  protected title: string = '';

  protected loginForm: FormGroup;
  protected loginModel: LoginModel = new LoginModel();
  private credential: CredentialModel = new CredentialModel();

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    protected toastr: ToastrService,
    protected credentialService: CredentialService,
    protected cryptoService: CryptoService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      mainPassword: ['', [Validators.required]],
      confirmMainPassword: ['', [Validators.required]]
    });

    this.loginForm.valueChanges.subscribe((data) => {
      this.loginModel.username = data.username;
      this.loginModel.password = data.mainPassword;
      this.loginModel.confirmPassword = data.confirmMainPassword;
    });
  }

  protected async onSetMasterPassword(): Promise<void> {}

  protected async setMasterPassword(actionType: string): Promise<void> {
    if (!this.validateSetInformation()) return;

    const resEncrypt = await this.cryptoService.encrypt(this.loginModel.password);
    if(!handleMessageError(resEncrypt[0], 'Warning - Set Password - encrypt', this.toastr)) return;

    const resCredential = await this.credentialService.setMasterPassword(this.loginModel.username, resEncrypt[1]);
    if(!handleMessageError(resCredential[0], 'Warning - Set Password - setMasterPassword - ', this.toastr)) return;

    if (resCredential[1]) {
      this.toastr.success('Password ' + actionType + ' correctly!', 'Information');
      this.router.navigate(['/login']);
    } else {
      this.loginModel.errorMessage = 'The master password is already set.';
    }
  }

  protected onBackPage(){
    this.router.navigate(['/login']);
  }

  protected validateSetInformation(): boolean
  {
    if (this.loginModel.password !== this.loginModel.confirmPassword) {
      this.loginModel.errorMessage = 'Passwords do not match.';
      return false;
    }

    if(this.loginModel.password.localeCompare(this.credential.password) === 0) {
      this.loginModel.errorMessage = 'The new password must be different from the previous one.';
      return false;
    }
    return true;
  }

  protected async getCredential(): Promise<void> {
    const resCredential = await this.credentialService.getLoginCredential();
    if(!handleMessageError(resCredential[0], 'Warning - getCredential', this.toastr)) return;

    if (resCredential[1].password !== '' && resCredential[1].username !== '')
      this.credential = credentialModelHelper(resCredential[1]);
  }
}
