import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-confirm-modal',
  imports: [CommonModule,
            MatDialogContent,
            MatDialogActions,
            ...materialImports],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent{

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onAcept(): void {
      this.dialogRef.close(true);
    }

    onClose(): void {
      this.dialogRef.close(false);
    }
}
