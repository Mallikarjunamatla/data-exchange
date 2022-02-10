// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import "firebase/compat/auth";
import 'firebase/compat/messaging';
import 'firebase/compat/functions';
import 'firebase/compat/analytics';
const firebaseConfig = {
  apiKey: "AIzaSyABLJHcb7HEhlooZtz-zEs-KijbxMFVk7k",
  authDomain: "team-members-io.firebaseapp.com",
  databaseURL: "https://team-members-io-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "team-members-io",
  storageBucket: "team-members-io.appspot.com",
  messagingSenderId: "588314883216",
  appId: "1:588314883216:web:0aa65e77df00a81e445415"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // let db : any, auth : any,storage : any, provider : any;
// if(firebase?.apps?.length === 0){
   const db = firebaseApp.firestore();
   const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  

  
 

  export default firebase;
  export {auth, provider, db};


  