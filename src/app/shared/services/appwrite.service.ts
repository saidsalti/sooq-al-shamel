import { Injectable } from '@angular/core';
import { APPWRITE, StorageBucket } from '@core/appwrite.config';
import { Client, ID, Storage } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  bucketId = StorageBucket.tempImages;

  constructor() {}

  uploadImage(file: File) {
    return APPWRITE.storeg.createFile(
      this.bucketId, // معرف الحاوية التي ترغب في رفع الصورة إليها
      ID.unique(),
      // معرف فريد للملف
      file
    );
  }
  readImage(id: any,width?:number) {
    return APPWRITE.storeg.getFilePreview(this.bucketId, id, width,undefined, undefined, 70);
  }

  removeImage(id: any) {
    return APPWRITE.storeg.deleteFile(this.bucketId, id);
  }
}
