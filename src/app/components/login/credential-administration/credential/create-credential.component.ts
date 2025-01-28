import { Component, OnInit } from '@angular/core';
import { materialImports } from '../../../../material.imports';
import { CommonModule } from '@angular/common';
import { BaseCredentialComponent } from './base-credential.component';
import { CredentialTypeEnum } from '../../../../core/enums/credential-type.enum';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [CommonModule,
            ...materialImports],
  templateUrl: '.././credential.component.html',
  styleUrl: '../.././login.component.scss'
})
export class CreateCredentialComponent
            extends BaseCredentialComponent
            implements OnInit{

  ngOnInit(): void {
    this.title = 'Set account';
  }

  override async onSetMasterPassword(): Promise<void> {
    await super.setMasterPassword(CredentialTypeEnum.STORED);
  }
}
