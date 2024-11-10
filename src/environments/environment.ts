// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: '',
  useHash: false,
  appwrite:{
    production:false,
    projectId:'672cf68c0025cd99e9c5',
    aPIEndpoint:'https://cloud.appwrite.io/v1',
    storedbId:'672d07b100130d620b08',
    advDbId:'672db4c80030c97d47f4'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
