import { environment } from '@env/environment';
import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setProject(environment.appwrite.projectId)
  .setEndpoint(environment.appwrite.aPIEndpoint);

export const APPWRITE = {
  projectId: environment.appwrite.projectId,
  client,
  account: new Account(client),
  db: new Databases(client),
  storeDbId: environment.appwrite.storedbId,
  advDbId: environment.appwrite.advDbId
};

export const collections={
  storeDb:{
    sections:'672f52ac0024224ec595',

  }
};
