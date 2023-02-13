import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDuH98GZxwCXAKfTGdzXGAzikQewsBxueE",
  authDomain: "pathshala-8995e.firebaseapp.com",
  projectId: "pathshala-8995e",
  storageBucket: "pathshala-8995e.appspot.com",
  messagingSenderId: "593033071205",
  appId: "1:593033071205:web:9000ae41fcfd6bd4e7d48c"
};




firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export { db };

export default firebase;
export const auth = firebase.auth();
