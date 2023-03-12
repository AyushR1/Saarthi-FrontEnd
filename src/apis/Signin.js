
const signInWithGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self");
};

const signOut = async () => {
  try {
    localStorage.removeItem("usersaarthi");
    // Redirect the user to home
    window.location.href = "http://localhost:3000/";
  } catch (error) {
    console.error(error);
  }
};

export { signInWithGoogle, signOut };