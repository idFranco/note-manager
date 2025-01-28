import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialImports } from '../../../../material.imports';
import { NotepadModel } from '../../../../core/models/notepad';
import { handleMessageError } from '../../../../core/handlers/message-error.handle';
import { BaseRecordComponent } from "./base-record.component";

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [CommonModule,
            ...materialImports],
  templateUrl: '.././record-note-base.component.html',
  styleUrl: '.././record-note-base.component.scss'
})
export class AddNoteComponent
            extends BaseRecordComponent
            implements OnInit {

  ngOnInit(): void {
    this.title = 'Create a New Note';
    this.viewBtnCancel = false;
  }

  override async saveNote(): Promise<void>  {

    if(!this.validateSetInformation()) return;

    if(!(await this.encryptPassword())) return;

    const resCredential = await this.noteService.addNote(this.note);
    if(!handleMessageError(resCredential[0], 'Warning - saveNote - addNote', this.toastr)) return;

    this.setCredentialForm.reset()
    this.note = new NotepadModel();

    this.toastr.success('Data correctly stored', 'Information');
  }
}
