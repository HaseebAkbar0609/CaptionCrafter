// Get user plan from Firestore by user ID
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * Get the user's plan from Firestore
 * @param {string} userId - The user's UID
 * @returns {Promise<string>} The user's plan (e.g., "Free", "Pro"), or null if not found
 */
export async function getUserPlan(userId) {
  if (!userId) return 'Free';
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      return data.plan ||"Free" ;
    }
    return "Free";
  } catch (error) {
    console.error("Error fetching user plan:", error);
    return "Free";
  }
}
