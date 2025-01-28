import { Injectable } from "@angular/core";
import { IDBNoteService } from "../../infraestructure/persistence.indexedDB/services/IDB-note.service";
import { handleError } from "../handlers/error.handle";
import { NotepadModel } from "../models/notepad";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private idbNoteService: IDBNoteService) {}

  async addNote(passwordFile: NotepadModel): Promise<[Error | undefined, number]> {
    return await handleError(() => this.idbNoteService.add(passwordFile), 0);
  }

  async updateNote(passwordFile: NotepadModel): Promise<[Error | undefined, void]> {
    return await handleError(() => this.idbNoteService.update(passwordFile), undefined);
  }

  async deleteNote(id: number): Promise<[Error | undefined, void]> {
    return await handleError(() => this.idbNoteService.delete(id), undefined);
  }

  async getPasswordNote(id: number): Promise<[Error | undefined, string]> {
    return await handleError(() => this.idbNoteService.getPassword(id), '');
  }

  async getAllNotes(): Promise<[Error | undefined, NotepadModel[]]> {
    return await handleError(() => this.idbNoteService.getAll(), []);
  }
}
