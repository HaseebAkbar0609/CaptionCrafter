// Helper for Google Auth with Firebase
import auth,{ googleProvider, db } from "@/config/firebase";
import { signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Sign in with Google
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        plan: "Free",
        remaingCredits: 5,
        usedCredits: 0,
        planStartDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });
    }
    console.log("User signed in successfully");
    return { user };
  } catch (error) {
    console.error("Error signing in with Google: ", error);
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
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      plan: "Free",
      remaingCredits: 5,
      usedCredits: 0,
      planStartDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });
    console.log("User created successfully");
    return { user };
  } catch (error) {
    return { error };
  }
}

// Sign out
export async function signOutGoogle() {
  try {
    signOut(auth);
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
