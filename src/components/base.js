import Rebase from "re-base";
import firebase from "firebase/app";
import 'firebase/database';

  
const firebaseApp = (typeof window !== 'undefined')?
  firebase.initializeApp({
    apiKey: "AIzaSyD3u34u7Hi4tkxpqVWoXJzYDjDuxNvTdDM",
    authDomain: "playgatsby.firebaseapp.com",
    databaseURL: "https://playgatsby.firebaseio.com"
  }):{};

const base = (typeof window !== 'undefined')?
  Rebase.createClass(firebaseApp.database()):{};
// This is a named export
export { firebaseApp };

// this is a default export
export default base;
