"use client";
import React from "react";
import CaptionGrid from "./caption-grid";
import { toaster } from "@/utils/toaster";
import auth from "@/config/firebase";
import { Loader } from "lucide-react";

export default function PeopleGeneratedCption() {
  const [captions, setCaptions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const getCaptionsFromAPI = async () => {
    setLoading(true);
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/get-public-captions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCaptions(data.response);
      } else {
        console.error("Failed to fetch captions");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getCaptionsFromAPI();
  }, []);
 
  

  return (
    <>
      <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)]">
        People Generated Captions
      </h3>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin w-8 h-8 text-[var(--color-primary)]" />
        </div>
      ) : (
        <CaptionGrid
          captions={captions}
        />
      )}
    </>
  );
}
