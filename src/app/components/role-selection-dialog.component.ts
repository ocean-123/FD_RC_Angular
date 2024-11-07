import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Roles } from './register/register.component';

@Component({
  selector: 'app-role-selection-dialog',
  template: `
    <h2 mat-dialog-title>Select Your Role</h2>
    <mat-dialog-content>
      <mat-radio-group [formControl]="roleControl">
        <mat-radio-button *ngFor="let role of roles" [value]="role">
          {{role}}
        </mat-radio-button>
      </mat-radio-group>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="roleControl.value" [disabled]="!roleControl.value">Confirm</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-radio-group {
      display: flex;
      flex-direction: column;
      margin: 15px 0;
      
    }
    mat-radio-button {
      margin: 5px;
    }
     
  `]
})
export class RoleSelectionDialogComponent {
  roles = Object.values(Roles);
  roleControl = new FormControl<Roles | null>(null);

  constructor(public dialogRef: MatDialogRef<RoleSelectionDialogComponent>) { }
}