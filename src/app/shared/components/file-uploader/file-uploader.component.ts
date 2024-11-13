import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class FileUploaderComponent {
  @Input() multiple = false;
  @Input() label = 'Upload Image'; // نص الزر الافتراضي
  @Input() acceptedFormats: string[] = ['png', 'jpeg', 'jpg']; // الصيغ المقبولة مثل 'png'
  @Input() maxSizeMB = 2; // الحجم الأقصى للملف بالميجابايت
  @Output() fileSelected = new EventEmitter<File[]>(); // الحدث بعد اختيار الصورة
  errorMessage: string | null = null; // رسالة الخطأ
  acceptedMimeTypes: string[] = []; // الأنواع المقبولة المحولة
  constructor() {
    this.acceptedMimeTypes = this.acceptedFormats.map(format => `image/${format}`);
  }

  onFileChange(event: any): void {
    if (!this.multiple) {
      this.selectSingFile(event);
    } else {
      this.selectMultipleFiles(event);
    }
  }

  selectSingFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!this.isValidFileType(file)) {
        this.errorMessage = `Invalid file type. Allowed types: ${this.acceptedFormats.join(', ')}`;
      } else if (!this.isValidFileSize(file)) {
        this.errorMessage = `File is too large. Maximum size allowed is ${this.maxSizeMB} MB.`;
      } else {
        this.errorMessage = null; // لا توجد أخطاء

        this.fileSelected.emit([file]);
      }
    }
  }

  selectMultipleFiles(event: any) {
    const files: FileList = event.target.files;
    const validFiles: File[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!this.isValidFileType(file)) {
        errors.push(
          `Invalid file type for ${file.name}. Allowed types: ${this.acceptedFormats.join(', ')}`
        );
      } else if (!this.isValidFileSize(file)) {
        errors.push(
          `File ${file.name} is too large. Maximum size allowed is ${this.maxSizeMB} MB.`
        );
      } else {
        validFiles.push(file);
      }
    }

    if (errors.length > 0) {
      this.errorMessage = errors.join('\n');
    } else {
      this.errorMessage = null; // لا توجد أخطاء
      this.fileSelected.emit(validFiles)
    }
  }

  private isValidFileType(file: File): boolean {
    return this.acceptedMimeTypes.includes(file.type);
  }

  private isValidFileSize(file: File): boolean {
    const fileSizeMB = file.size / (1024 * 1024); // تحويل الحجم من بايت إلى ميجابايت
    return fileSizeMB <= this.maxSizeMB;
  }
}
