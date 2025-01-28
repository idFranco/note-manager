import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { materialImports } from '../../../../material.imports';
import { NotepadModel } from '../../../../core/models/notepad';
import { CryptoService } from '../../../../core/services/crypto.service';
import { handleMessageError } from '../../../../core/handlers/message-error.handle';
import { NoteService } from '../../../../core/services/note.service';

@Component({
  selector: 'app-base-record',
  standalone: true,
  imports: [CommonModule,
            ...materialImports],
  templateUrl: '.././record-note-base.component.html',
  styleUrl: '.././record-note-base.component.scss'
})
export class BaseRecordComponent {

  protected setCredentialForm: FormGroup;
  protected note: NotepadModel = new NotepadModel();
  protected title: string = '';
  protected viewBtnCancel: boolean = false;
  errorMessage: string = '';

  constructor(
    protected fb: FormBuilder,
    protected cryptoService: CryptoService,
    protected noteService: NoteService,
    protected toastr: ToastrService,
  ) {
    this.setCredentialForm = this.fb.group({
      title: ['', [Validators.required]],
      password: ['', [Validators.required]],
      notes: ['']
    });

    this.setCredentialForm.valueChanges.subscribe((data) => {
      this.note.title = data.title;
      this.note.password = data.password;
      this.note.notes = data.notes;
    });
  }

  protected async saveNote(): Promise<void> {}

  protected onClose(): void {}

  protected validateSetInformation(): boolean {
    this.errorMessage = '';

    const validations = [
      { field: this.note.title, message: 'Title is required' },
      { field: this.note.password, message: 'Password is required' }
    ];

    for (const validation of validations) {
      if (!validation.field || validation.field.trim() === '') {
        this.errorMessage = validation.message;
        return false;
      }
    }
    return true;
  }

  protected async encryptPassword(): Promise<boolean> {

    const resEncrypt = await this.cryptoService.encrypt(this.note.password);
    if(!handleMessageError(resEncrypt[0], 'Warning - saveNote - encrypt', this.toastr)) return false;

    this.note.password = resEncrypt[1];
    return true;
  }

}
