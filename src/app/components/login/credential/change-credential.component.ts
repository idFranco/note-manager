import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { materialImports } from "../../../material.imports";
import { BaseCredentialComponent } from './base-credential.component';
import { CredentialTypeEnum } from "../../../core/enums/credential-type.enum";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule,
            ...materialImports],
  templateUrl: './credential.component.html',
  styleUrl: '.././login.component.scss'
})
export class ChangeCredentialComponent
            extends BaseCredentialComponent
            implements OnInit{

  async ngOnInit(): Promise<void> {
    this.title = 'Change account';
    await super.getCredential();
  }

  override async onSetMasterPassword(): Promise<void> {
    await super.setMasterPassword(CredentialTypeEnum.CHANGED);
  }
}
