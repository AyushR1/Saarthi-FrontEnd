import firebase from "../firebase";
const auth = firebase.auth();
const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    const user = result.user;

   
    localStorage.setItem("uid-saarthi", user.uid);
    // Redirect the user to the desired page upon successful sign-in
    window.location.href = "http://localhost:3000/dashboard";
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

const signOut = async () => {
  try {
    await auth.signOut();

    localStorage.removeItem("uid-saarthi");
  
    // Redirect the user to home
    window.location.href = "http://localhost:3000/";
  } catch (error) {
    console.error(error);
  }
};

export { signInWithGoogle, signOut };