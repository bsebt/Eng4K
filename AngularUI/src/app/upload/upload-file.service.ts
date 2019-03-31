import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';

import { FileUpload } from './fileupload';
import { AngularFireAuth } from 'angularfire2/auth';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private basePath = '/uploads';
  userId: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.basePath}/${this.userId}/${fileUpload.file.name}`)
      .put(fileUpload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        console.log(snap.ref.parent.name);
        progress.percentage = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
      },
      error => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          console.log(this.getFileUploadKey(fileUpload.name));
          fileUpload.size = fileUpload.file.size;
          fileUpload.date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
          fileUpload.tags = [''];
          fileUpload.personalTags = [''];
          this.saveFileData(fileUpload);
        });
      }
    );
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/${this.userId}`).push(fileUpload).on("value", snap => {
      console.log(snap.key);
      this.deleteFileStorage(fileUpload.name);
      const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.basePath}/${this.userId}/${snap.key}/${fileUpload.file.name}`)
      .put(fileUpload.file);
    });
  }

  getFileUploads(numberItems): AngularFireList<any> {
    if (!this.userId) return;
    return this.db.list(`${this.basePath}/${this.userId}`, ref =>
      ref.limitToFirst(numberItems)
    );
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/${this.userId}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${this.userId}/${name}`).delete();
  }

  renameFileUpload(fileUpload: FileUpload, newName: string) {
    this.db.list(`${this.basePath}/${this.userId}/`).update(fileUpload.key, {name: newName});
  }
  
  renameFileUrl(fileUpload: FileUpload, newUrl: string) {
    this.db.list(`${this.basePath}/${this.userId}/`).update(fileUpload.key, {url: newUrl});
  }

  addFileTag(fileUpload: FileUpload, newTagArray: string[]){
    this.db.list(`${this.basePath}/${this.userId}/`).update(fileUpload.key, {tags: newTagArray});
  }

  getFileUploadKey(name: string) {
    return this.db.list(`${this.basePath}/${this.userId}/`, ref => 
      ref.startAt(name).endAt(name+"\uf8ff")
    )
  }

  addPersonalFileTag(fileUpload: FileUpload, newTagArray: string[]){
    this.db.list(`${this.basePath}/${this.userId}/`).update(fileUpload.key, {personalTags: newTagArray});
  }
}
