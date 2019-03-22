import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FileUpload } from '../fileupload';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit{

  @Input() fileUpload: FileUpload;
  // Get this number from *ngFor.
  @Input() index: number;

  isFiledEdited: boolean = false;
  newFileName: string;

  // Bytes to KB and MB
  static readonly ONE_KB = 1024;
  static readonly ONE_MB = Math.pow(DetailsUploadComponent.ONE_KB, 2);

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    // this.detectFileChanges();
    

  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }

  getFileSize(): string {
    // Size in MB.
    let size: number = this.fileUpload.size/DetailsUploadComponent.ONE_MB;
    let conversionRate = 1000;
    let result: string = '';

    if (size < 1) {
      // Then it is in KB.
      size = size * conversionRate;
      result = size.toFixed(2).toString().concat(' KB');
    } else {
      result = size.toFixed(2).toString().concat(' MB');
    }
    return result;
  }

  detectFileChanges() {
    // To access the variable within the listener
    let self = this;
    let title = <HTMLInputElement>document.getElementsByClassName("editName")[this.index];

    title.addEventListener("input", function() {
      self.isFiledEdited = true;
      self.newFileName = title.innerHTML.toString().replace(/&nbsp;/g, '').trim();
    }, true);

    // Prevent user from adding a new line.
    title.addEventListener('keypress', (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      } 
    });
  }

  renameFile(fileUpload) {
    this.isFiledEdited = false;

    let title = <HTMLInputElement>document.getElementsByClassName("editName")[this.index];
    title.innerHTML = this.newFileName;
    this.uploadService.renameFileUpload(fileUpload, this.newFileName);
  }

  addTag(tag: string) {
    let newTagArray = this.fileUpload.tags;
    newTagArray.push(tag);
    this.uploadService.addFileTag(this.fileUpload, newTagArray);
  }


}