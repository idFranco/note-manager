import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { materialImports } from '../../material.imports';
import { LoginModel } from '../../core/models/login.model';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CredentialModel } from '../../core/models/credential.model';
import { CryptoService } from '../../core/services/crypto.service';
import { handleMessageError } from '../../core/handlers/message-error.handle';
import { CredentialService } from '../../core/services/credential.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
            ...materialImports],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginModel: LoginModel = new LoginModel();
  private credential: CredentialModel = new CredentialModel();
  protected isMasterPasswordSet: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authGuard: AuthGuard,
    private cryptoService: CryptoService,
    private credentialService: CredentialService,
    private toastr: ToastrService,
  ) {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });

    this.loginForm.valueChanges.subscribe((data) => {
      this.loginModel.password = data.password;
      this.loginModel.username = data.username;
    });
  }

  async ngOnInit(): Promise<void> {

    const resCredential = await this.credentialService.isMasterPasswordSet();
    if(!handleMessageError(resCredential[0], 'Warning - On init', this.toastr)) return;

    this.isMasterPasswordSet = resCredential[1];

    if (this.isMasterPasswordSet)
    {
      const resCredential = await this.credentialService.getLoginCredential();
      if(!handleMessageError(resCredential[0], 'Warning - On init', this.toastr)) return;

      this.credential = resCredential[1];
    }
    else
      this.loginForm.disable();
  }

  async onLogin(): Promise<void> {
    this.loginModel.errorMessage = '';

    if (this.loginForm.invalid || this.loginModel.password.length == 0) return;

    if (await this.validateLoginInformation()) {

      this.authGuard.authenticate();
      this.router.navigate(['/administration']);

    }
  }

  onSetMasterPassword(){
    this.router.navigate(['/create-credential']);
  }

  onChangeMasterPassword(){
    this.router.navigate(['/change-credential']);
  }

  private async validateLoginInformation(): Promise<boolean> {

    const resDecrypt = await this.cryptoService.decrypt(this.credential.password);
    if(!handleMessageError(resDecrypt[0], 'Warning - On login', this.toastr)) return false;

    if (this.loginModel.password.localeCompare(resDecrypt[1]) != 0 &&
        this.loginModel.username.localeCompare(this.credential.username) != 0) {

      this.loginModel.errorMessage = 'Incorrect Username or Password. Please try again.';
      return false;
    }

    return true;
  }
}
