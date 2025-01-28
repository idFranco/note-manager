import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-view-password-modal',
  standalone: true,
  imports: [CommonModule,
            MatDialogContent,
            MatDialogActions,
            ...materialImports],
  templateUrl: './view-password-modal.component.html',
  styleUrl: './view-password-modal.component.scss'
})
export class ViewPasswordModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewPasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
