import firebase from "../firebase";
const auth = firebase.auth();
const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(() => {
      // Redirect the user to the desired page upon successful sign-in
      window.location.href = "http://localhost:3000/dashboard";
    })
    .catch(error => {
      // Handle errors here
      console.error(error);
    });
  };
  
  
  export default signInWithGoogle;