import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../fileupload';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;

  // Bytes to KB and MB
  static readonly ONE_KB = 1024;
  static readonly ONE_MB = Math.pow(DetailsUploadComponent.ONE_KB, 2);

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
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
}