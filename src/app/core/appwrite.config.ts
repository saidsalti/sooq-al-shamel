import { environment } from '@env/environment';
import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
  .setProject(environment.appwrite.projectId)
  .setEndpoint(environment.appwrite.aPIEndpoint);

export const APPWRITE = {
  projectId: environment.appwrite.projectId,
  client,
  account: new Account(client),
  storeg:new Storage(client),
  db: new Databases(client),
  storeDbId: environment.appwrite.storedbId,
  advDbId: environment.appwrite.advDbId
};

export const collections={
  storeDb:{
    sections:'672f52ac0024224ec595',

  }
};

export const StorageBucket={
  tempImages:'67339584003d6b64e0f9'
};
