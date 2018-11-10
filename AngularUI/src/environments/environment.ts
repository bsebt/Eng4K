// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Url to redirect and sign up with mongo DB
  // Will be changed in the future, for now use ur local host
  // and change this url as you see fit to work.
  //baseUrl: 'http://localhost:3000/api'
  
  firebase: {
    apiKey: "AIzaSyBiomiSQpwg4PFFAML9o3WhhthUgjkB9HU",
    authDomain: "dataanalytics-62317.firebaseapp.com",
    databaseURL: "https://dataanalytics-62317.firebaseio.com",
    projectId: "dataanalytics-62317",
    storageBucket: "dataanalytics-62317.appspot.com",
    messagingSenderId: "871806633643"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
