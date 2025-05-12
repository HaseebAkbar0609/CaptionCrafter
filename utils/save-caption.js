import auth from "@/config/firebase";

export async function saveCaption( caption, platform, tone ) {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (!token) throw new Error("No auth token");
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/save-caption",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ caption, platform, tone,token }),
      }
    );
    if (!response.ok) throw new Error("Failed to save caption");
    return await response.json();
  } catch (e) {
    throw e;
  }
}
