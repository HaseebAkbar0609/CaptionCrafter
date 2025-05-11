// Helper for Google Auth with Firebase
import auth, { googleProvider } from "../config/firebase";
import { signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";

// Sign in with Google
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // The signed-in user info.
    const user = result.user;
    // You can also access the Google Access Token via result._tokenResponse.oauthAccessToken
    return { user };
  } catch (error) {
    // Handle Errors here.
    return { error };
  }
}

// Login with email and password
export async function loginWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    return { user };
  } catch (error) {
    return { error };
  }
}

// Signup with email and password
export async function signupWithEmail(email, password) {
  try {
    const { createUserWithEmailAndPassword } = await import("firebase/auth");
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    return { user };
  } catch (error) {
    return { error };
  }
}

// Sign out
export async function signOutGoogle() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { error };
  }
}

// Reset password with email
export async function resetPasswordWithEmail(email) {
  try {
    const { sendPasswordResetEmail } = await import("firebase/auth");
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { error };
  }
}

// Reset password with code (oobCode)
export async function resetPasswordWithCode(oobCode, newPassword) {
  try {
    const { confirmPasswordReset } = await import("firebase/auth");
    await confirmPasswordReset(auth, oobCode, newPassword);
    return { success: true };
  } catch (error) {
    return { error };
  }
}
