import { Injectable } from '@angular/core';
import { APPWRITE, collections } from '@core/appwrite.config';
import { Query } from 'appwrite';

@Injectable({ providedIn: 'root' })
export class LookupService {
  makeCollectionId = '672e2b1d00329d292700';
  modelCollectionId = '672e2b26002e6da58730';
  cartypeCollectionId = '672e2b41003576205bcf';
  sections = collections.storeDb.sections;

  loadMakes() {
    return APPWRITE.db.listDocuments(APPWRITE.advDbId, this.makeCollectionId);
  }
  loadModel(makeId: string) {
    return APPWRITE.db.listDocuments(APPWRITE.advDbId, this.modelCollectionId, [
      Query.equal('make', makeId),
    ]);
  }
  async loadMakesOptions(lang = 'ar') {
    return (await this.loadMakes()).documents.map((a: any) => {
      return {
        label: a[`name_${lang}`],
        value: a.$id,
      };
    });
  }
  async loadModelsOptions(makeId: string, lang = 'ar') {
    const result = await this.loadModel(makeId);
    return result.documents.map((a: any) => {
      return {
        label: a[`name_${lang}`],
        value: a.$id,
      };
    });
  }

  async loadCarType() {
    const r = await APPWRITE.db.listDocuments(APPWRITE.advDbId, this.cartypeCollectionId);
    return r.documents;
  }

  async parentSections(filter?: string[]) {

    let q: string[] = [];
    q.push(Query.equal('parentId', '-1'));
    if (filter && filter.length > 0) {
      q = q.concat(filter);
    }
    return await APPWRITE.db.listDocuments(APPWRITE.storeDbId, this.sections, q);
  }
  async getChildSections(id: string,filter?: string[]) {
    let q: string[] = [];
    q.push(  Query.equal('parentId', id));
    if (filter && filter.length > 0) {
      q = q.concat(filter);
    }
    return await APPWRITE.db.listDocuments(APPWRITE.storeDbId, this.sections, q);
  }
}
