import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { materialImports } from '../../../material.imports';
import { NotepadModel } from '../../../core/models/notepad';
import { ViewPasswordModalComponent } from '../../shared/view-password-modal/view-password-modal.component';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { CryptoService } from '../../../core/services/crypto.service';
import { handleMessageError } from '../../../core/handlers/message-error.handle';
import { NoteService } from '../../../core/services/note.service';
import { EditNoteModalComponent } from '../record-note/record/edit-note-modal.component';

@Component({
  selector: 'app-list-note',
  standalone: true,
  imports: [CommonModule,
            ...materialImports],
  templateUrl: './list-note.component.html',
  styleUrl: './list-note.component.scss'
})
export class ListNoteComponent implements AfterViewInit {

  displayedColumns: string[] = ['actions',
                                'title',
                                'password',
                                'notes',];

  lNote: NotepadModel[] = [];
  dataSource: MatTableDataSource<NotepadModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private cryptoService: CryptoService,
    private noteService: NoteService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  async ngAfterViewInit(): Promise<void> {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    await this.getAllNotes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getPassword(id: number): Promise<void> {
    const resNote = await this.noteService.getPasswordNote(id);
    if(!handleMessageError(resNote[0], 'Warning - getPassword', this.toastr)) return;

    const resDecrypt = await this.cryptoService.decrypt(resNote[1]);
    if(!handleMessageError(resDecrypt[0], 'Warning - decrypt', this.toastr)) return;

    const dialogRef = this.dialog.open(ViewPasswordModalComponent, {
      width: '250px',
      data: {password: resDecrypt[1]},
      disableClose: true
    });
  }

  async deleteNote(id: number): Promise<void> {

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async (dialogResult) => {
      if (dialogResult === true) {
        await this.noteService.deleteNote(id);

        await this.getAllNotes();
      }
    });
  }

  async modifyNote(note: NotepadModel): Promise<void> {

    const dialogRef = this.dialog.open(EditNoteModalComponent, {
      width: '50%',
      data: note,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async (dialogResult) => {
      if (dialogResult === true) {
        await this.getAllNotes();
      }
    });
  }

  private async getAllNotes(): Promise<void> {
    const resNote = await this.noteService.getAllNotes();
    if(!handleMessageError(resNote[0], 'Warning - getAllPasswords', this.toastr)) return;

    this.dataSource.data = resNote[1];
  }
}
