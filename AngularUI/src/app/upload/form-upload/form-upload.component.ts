import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { FileUpload } from '../fileupload';
import * as _ from 'lodash';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})

export class FormUploadComponent implements OnInit {
 
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  didUploadFail: Boolean;
 
  constructor(private uploadService: UploadFileService) { }
 
  ngOnInit() {
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    this.didUploadFail = true;
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    //limit file size to 3MB as per requirements 
    if(file.size < 3 * 1024 * 1024){
      this.didUploadFail = false;
      this.currentFileUpload = new FileUpload(file);
      this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
    }

    // Clear upload field after everything is done.
    let fileElement = <HTMLInputElement>document.getElementById('myFile');
    fileElement.value = null;
  }
}