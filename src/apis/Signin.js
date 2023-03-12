const signInWithGoogle = () => {
  try {
     window.open("http://localhost:5000/auth/google", "_self");   
    // Redirect the user to the desired page upon successful sign-in
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

const signOut = async () => {
  try {

    localStorage.removeItem("uid-saarthi");
  
    // Redirect the user to home
    window.location.href = "http://localhost:3000/";
  } catch (error) {
    console.error(error);
  }
};

export { signInWithGoogle, signOut };