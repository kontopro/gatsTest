import Rebase from "re-base";
import firebase from "firebase/app";
import 'firebase/database';

  
const firebaseApp = (typeof window !== 'undefined')?
  firebase.initializeApp({
    apiKey: process.env.GATSBY_API_KEY,
    authDomain: process.env.GATSBY_AUTH_DOMAIN,
    databaseURL: process.env.GATSBY_DATABASE_URL
  }):{};

const base = (typeof window !== 'undefined')?
  Rebase.createClass(firebaseApp.database()):{};
// This is a named export
export { firebaseApp };

// this is a default export
export default base;
