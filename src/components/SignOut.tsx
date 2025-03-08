import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const SignOut: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      style={{ padding: "10px", fontSize: "16px" }}
    >
      Sign Out
    </button>
  );
};

export default SignOut;
