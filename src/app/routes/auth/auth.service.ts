import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APPWRITE } from '@core/appwrite.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  db = APPWRITE.db;
  account = APPWRITE.account;
  dbId = APPWRITE.storeDbId;
  async login(data: { email: string; password: string }) {
    const r = await APPWRITE.account.createEmailPasswordSession(data.email, data.password);
    if (r) {
      this.router.navigate(['/']);
    }
  }

  async signout() {
    try {
      await this.account.deleteSession('current'); // حذف الجلسة الحالية للمستخدم
      this.router.navigate(['/auth/login']); // إعادة التوجيه إلى صفحة تسجيل الدخول
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
