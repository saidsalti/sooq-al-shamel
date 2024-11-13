import { Injectable } from '@angular/core';
import { Menu, MenuChildrenItem, MenuPermissions, MenuTag } from '@core';
import { APPWRITE, collections } from '@core/appwrite.config';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppMenuService {
  constructor() { }
  appMenus(){
     return this.getMenuData();

  }
  getMenuData(): Observable<Menu[]> {
    return new Observable<Menu[]>((observer) => {
      APPWRITE.db.listDocuments(APPWRITE.storeDbId,collections.storeDb.menus)
        .then(response => {
          const menus: Menu[] = response.documents.map((doc: any) => this.mapToMenu(doc));
          observer.next(menus);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching menu data:', error);
          observer.error(error);
        });
    });
  }

  // تحويل البيانات إلى الواجهات المناسبة
  private mapToMenu(doc: any): Menu {
    const menu: Menu = {
      route: doc.path,
      name: doc.name_ar,
      type: doc.type,
      icon: doc.icon || '',
      label: doc.name_ar ,
      badge: doc.badge ? this.mapToMenuTag(doc.badge) : undefined,
      children: doc.children ? doc.children.map((child: any) => this.mapToMenuChild(child)) : [],
      permissions: doc.permissions ? this.mapToMenuPermissions(doc.permissions) : undefined
    };
    console.log(menu);
    return menu;
  }
  private mapToMenuTag(tag: any): MenuTag {
    return {
      color: tag.color,
      value: tag.value
    };
  }
  private mapToMenuChild(child: any): MenuChildrenItem {

    return {
      route: child.path,
      name: child.name_ar,
      type: child.type,
      children: child.children ? child.children.map((ch: any) => this.mapToMenuChild(ch)) : [],
      permissions: child.permissions ? this.mapToMenuPermissions(child.permissions) : undefined
    };
  }

  private mapToMenuPermissions(permissions: any): MenuPermissions {
    return {
      only: permissions.only,
      except: permissions.except
    };
  }
}
