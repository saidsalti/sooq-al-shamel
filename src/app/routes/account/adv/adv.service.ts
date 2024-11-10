import { Injectable } from '@angular/core';
import { APPWRITE } from '@core/appwrite.config';
import { ID, Permission, Query, Role } from 'appwrite';

@Injectable({ providedIn: 'root' })
export class AdvService {
  dbId = APPWRITE.advDbId;
  advertisings = '672db4d9000b802efc28';
  constructor() {}

  async loadMyAdv() {
    const user = await APPWRITE.account.get();
    return await APPWRITE.db.listDocuments(this.dbId, this.advertisings, [
      Query.equal('userId', user.$id),
    ]);
  }

  async addAdv(data: any) {
    try {
      // الحصول على المستخدم الحالي
      const user = await APPWRITE.account.get();

      // إنشاء المستند مع أذونات القراءة والتحديث والحذف للمستخدم الحالي فقط
      await APPWRITE.db.createDocument(
        APPWRITE.advDbId, // قاعدة بيانات الإعلان
        this.advertisings, // معرف المجموعة أو التصنيف
        ID.unique(),
        { ...data, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
    } catch (error) {
      console.error('Error creating document:', error);
    }
  }


}
