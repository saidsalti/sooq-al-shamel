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
  @Input() label = 'Upload Image'; // نص الزر الافتراضي
  @Input() acceptedFormats: string[] = ['png', 'jpeg', 'jpg']; // الصيغ المقبولة مثل 'png'
  @Input() maxSizeMB = 2; // الحجم الأقصى للملف بالميجابايت
  @Output() fileSelected = new EventEmitter<File>(); // الحدث بعد اختيار الصورة
  errorMessage: string | null = null; // رسالة الخطأ
  acceptedMimeTypes: string[] = []; // الأنواع المقبولة المحولة
  constructor() {
    this.acceptedMimeTypes = this.acceptedFormats.map(format => `image/${format}`);

  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!this.isValidFileType(file)) {
        this.errorMessage = `Invalid file type. Allowed types: ${this.acceptedFormats.join(', ')}`;
      } else if (!this.isValidFileSize(file)) {
        this.errorMessage = `File is too large. Maximum size allowed is ${this.maxSizeMB} MB.`;
      } else {
        this.errorMessage = null; // لا توجد أخطاء
        this.fileSelected.emit(file);
      }
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
