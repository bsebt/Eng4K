import { Component, OnInit, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit, AfterViewInit {

  fileUploads: any[];
  static readonly MAX = 10;
  searchTerm: string;

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {
    this.update();
  }

  areFilesAvailable() {
    if (this.fileUploads) {
      return (this.fileUploads.length > 0);
    }
    return false;
  }

  ngAfterViewInit() {
    this.update();
  }

  update() {
    // Use snapshotChanges().pipe(map()) to store the key
    this.uploadService.getFileUploads(ListUploadComponent.MAX).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }
}