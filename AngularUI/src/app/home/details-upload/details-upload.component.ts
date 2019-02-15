import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../fileupload';
import { UploadFileService } from '../upload-file.service';
//import { dialog-demo} from '../dialog'
import {DialogDemoComponent} from '../../dialog-demo/dialog-demo.component'
// import {MyDialogComponent} from '../../my-dialog/my-dialog.component'
// import {MatDialog} from '@angular/material';


@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }

  openDialog() {
    // let dialogRef = this.dialog.open(MyDialogComponent, {
    //   width: '600px',
    //   data: 'This text is passed into the dialog!'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog closed: ${result}`);
    //   //this.dialog.afterAllClosed.
    //   //this.dialogResult = result;
    // });
  }

}