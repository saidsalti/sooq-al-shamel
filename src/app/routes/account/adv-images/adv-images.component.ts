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
  imports: [PageHeaderComponent, FileUploaderComponent, MatCardModule,CommonModule],
})
export class AccountAdvImagesComponent implements OnInit {
  router = inject(Router);
  appwriteService = inject(AppwriteService);
  model?: any;
  mainImageSrc?: string | ArrayBuffer | null | undefined;
  ngOnInit() {
    this.getmodel();
    this.readImage(localStorage.getItem('mainImageSrc'));
  }
  getmodel() {
    const modelStr = sessionStorage.getItem('__adv__model');
    if (!modelStr) {
      this.router.navigate(['/account/add-adv']);
    } else {
      this.model = JSON.parse(modelStr);
    }
  }
  onFileSelected(file: File) {
    const savedId = localStorage.getItem('mainImageSrc');
    if (savedId) {
      this.appwriteService.removeImage(savedId);
    }
    if (file) {
      this.appwriteService
        .uploadImage(file)
        .then(a => {
          if (a) {
            localStorage.setItem('mainImageSrc', a.$id);
            const read = this.appwriteService.readImage(a.$id);
            this.mainImageSrc = read;
          }
        })
        .catch(e => console.log(e));
    }
    // const reader = new FileReader();
    // reader.onload = e => {
    //   this.mainImageSrc = e.target?.result;
    // };
    //reader.readAsDataURL(file);
  }

  readImage(id?: any) {
    let imageId = localStorage.getItem('mainImageSrc');
    if (!imageId) {
      imageId = id;
    }
    if (imageId) {
      this.mainImageSrc = this.appwriteService.readImage(imageId,240);
    }
  }
}
