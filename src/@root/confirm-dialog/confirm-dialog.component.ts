import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  public title = 'Êtes-vous sûr ?';
  public message = 'Supprimer ce membre';
  public cancelButtonLabel = 'Annuler';
  public confirmButtonLabel = 'Confirmer';

  constructor( public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
}
