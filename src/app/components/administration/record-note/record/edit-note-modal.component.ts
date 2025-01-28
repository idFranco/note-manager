import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { materialImports } from '../../../../material.imports';
import { handleMessageError } from '../../../../core/handlers/message-error.handle';
import { NotepadModel } from '../../../../core/models/notepad';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { CryptoService } from '../../../../core/services/crypto.service';
import { NoteService } from '../../../../core/services/note.service';
import { ToastrService } from 'ngx-toastr';
import { BaseRecordComponent } from './base-record.component';

@Component({
  selector: 'app-modify-note',
  standalone: true,
  imports: [CommonModule,
            ...materialImports],
  templateUrl: '.././record-note-base.component.html',
  styleUrl: '.././record-note-base.component.scss'
})
export class EditNoteModalComponent
            extends BaseRecordComponent
            implements OnInit, AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<EditNoteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotepadModel,
    protected override fb: FormBuilder,
    protected override cryptoService: CryptoService,
    protected override noteService: NoteService,
    protected override toastr: ToastrService
  ) {
    super(fb, cryptoService, noteService, toastr);
  }

  ngOnInit(): void {

    this.title = 'Edit Note';
    this.viewBtnCancel = true;

    if (this.data) {
      this.setCredentialForm.patchValue({
        title: this.data.title,
        password: '',
        notes: this.data.notes
      });
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.data) {
      const password = await this.getPassword(this.data.id);
      if (password == '') return;

      this.setCredentialForm.patchValue({
        password: password
      });
      this.note.id = this.data.id;
    }
  }

  override async saveNote() {

    if(!this.validateSetInformation()) return;

    if(!(await this.encryptPassword())) return;

    const resCredential = await this.noteService.updateNote(this.note);
    if(!handleMessageError(resCredential[0], 'Warning - saveNote - addNote', this.toastr)) return;

    this.setCredentialForm.reset()
    this.note = new NotepadModel();

    this.toastr.success('Data correctly modify and stored', 'Information');

    this.dialogRef.close(true);
  }

  private async getPassword(id: number): Promise<string> {
    const resNote = await this.noteService.getPasswordNote(id);
    if(!handleMessageError(resNote[0], 'Warning - getPassword', this.toastr)) return '';

    const resDecrypt = await this.cryptoService.decrypt(resNote[1]);
    if(!handleMessageError(resDecrypt[0], 'Warning - decrypt', this.toastr)) return '';

    return resDecrypt[1];
  }

  override onClose(): void {
    this.dialogRef.close(false);
  }

}
