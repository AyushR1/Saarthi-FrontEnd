
const signInWithGoogle = () => {
    window.open("https://saarthi.onrender.com/auth/google", "_self");
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