import auth from "@/config/firebase";

export async function getCaption() {
  try {
    const token = await auth.currentUser?.getIdToken();
    const userId = auth.currentUser?.uid;
    if (!token) throw new Error("No auth token");
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + `/api/get-user-captions/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    );
    if (!response.ok) throw new Error("Failed to save caption");
    return await response.json();
  } catch (e) {
    throw e;
  }
}
