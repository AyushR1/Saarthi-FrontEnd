import firebase from "../firebase";
const auth = firebase.auth();
const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  
  export default signInWithGoogle;