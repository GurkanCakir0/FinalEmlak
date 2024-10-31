import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Confirm-dialog',
  templateUrl: './Confirm-dialog.component.html',
  styleUrls: ['./Confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  dialogMesaj: string;
  constructor(
    public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
  }

}
