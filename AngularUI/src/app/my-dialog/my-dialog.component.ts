import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  constructor(public thisDialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }
  ngOnInit() {
  }
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}