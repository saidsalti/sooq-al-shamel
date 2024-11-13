import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '@shared';
import { FileUploaderComponent } from '@shared/components/file-uploader/file-uploader.component';
import { AppwriteService } from '@shared/services/appwrite.service';

@Component({
  selector: 'app-account-adv-images',
  templateUrl: './adv-images.component.html',
  styleUrl: './adv-images.component.scss',
  standalone: true,
  imports: [PageHeaderComponent, FileUploaderComponent, MatCardModule, CommonModule],
})
export class AccountAdvImagesComponent implements OnInit {
  router = inject(Router);
  appwriteService = inject(AppwriteService);
  model?: any;
  isUploading = false;
  mainImageSrc?: string | ArrayBuffer | null | undefined;
  imagesSrc?: string[] = [];
  imagesUrls?:string[]=[];
  ngOnInit() {
    this.getmodel();
   this.getImageSrc();
    this.readImage(localStorage.getItem('mainImageSrc'));

  }
  // getImagsIds():string[]{
  //   const imagesIdsStr=localStorage.getItem('imagesSrc');
  //   if(imagesIdsStr&& imagesIdsStr.length>0){
  //     return imagesIdsStr.join(',')
  //   }
  // }
  getmodel() {
    const modelStr = sessionStorage.getItem('__adv__model');
    if (!modelStr) {
      this.router.navigate(['/account/add-adv']);
    } else {
      this.model = JSON.parse(modelStr);
    }
  }
  onFileSelected(file:File[]) {
    this.mainImageSrc = null;
    this.isUploading = true;
    const savedId = localStorage.getItem('mainImageSrc');
    if (savedId) {
      this.appwriteService.removeImage(savedId);
    }
    if (file[0]) {
      this.appwriteService
        .uploadImage(file[0])
        .then(a => {
          if (a) {
            localStorage.setItem('mainImageSrc', a.$id);
            const read = this.appwriteService.readImage(a.$id);
            this.mainImageSrc = read;
            this.isUploading = false;
          }
        })
        .catch(e => {
          this.isUploading = false;
        });
    }
    // const reader = new FileReader();
    // reader.onload = e => {
    //   this.mainImageSrc = e.target?.result;
    // };
    //reader.readAsDataURL(file);
  }

  // readImage1(id?: any) {
  //   let imageId = localStorage.getItem('mainImageSrc');
  //   if (!imageId && imageId != null) {
  //     imageId = id;
  //   }
  //   if (imageId) {
  //     this.mainImageSrc = this.appwriteService.readImage(imageId, 240);
  //   }
  // }
  // get mainImageIdFromLocal():string |null{
  //   return localStorage.getItem('mainImageSrc');

  // }
  readImage(id?: any) {

    if (id) {
      this.mainImageSrc = this.appwriteService.readImage(id, 240);
    }
  }
  getImageSrc(){
    let images=localStorage.getItem('imagesSrc');
    let imgsurl:string[]=[];
    if(images){
     const imgs = JSON.parse(images) as string[];
     imgs.forEach(id => {
      console.log(this.readImage(id!)!);
      this.imagesUrls!.push(this.readImage(id)!);
     });
    }

  }
  onSelectedMultiaples(files: File[]) {

    var fileIds:string[]=[];
    if(files.length>0){
      files.forEach(file=>{
        this.appwriteService
        .uploadImage(file)
        .then(a => {
          if (a) {
            fileIds.push(a.$id);
            localStorage.setItem('imagesSrc',JSON.stringify(fileIds));


          }
        })
        .catch(e => {
          this.isUploading = false;
        });
      })

    }
  }
}
