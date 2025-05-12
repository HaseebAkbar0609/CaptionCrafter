"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import EditCaptionDialog from "@/components/edit-caption-dialog";
import { toaster } from "@/utils/toaster";
import { getCaption } from "@/utils/get-caption";
import { Loader } from "lucide-react";
import auth from "@/config/firebase";

const PLATFORMS = ["All", "Instagram", "LinkedIn", "Twitter"];
const TONES = [
  "All",
  "Funny",
  "Professional",
  "Relatable",
  "Motivational",
  "Casual",
];

export default function SavedCaptionsPage() {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [toneFilter, setToneFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [copyLoadingId, setCopyLoadingId] = useState(null);
  const PAGE_SIZE = 5;

  React.useEffect(() => {
    setLoading(true);
    // Fetch saved captions from backend using getCaption
    getCaption()
      .then((data) => setCaptions(data.response))
      .catch(() => setCaptions([]))
      .finally(() => setLoading(false));
  }, []);
  const filtered = captions.filter(
    (c) =>
      (platformFilter === "All" || c.platform === platformFilter) &&
      (toneFilter === "All" || c.tone === toneFilter)
  );
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleCopy = async (id, caption) => {
    setCopyLoadingId(id);
    try {
      await navigator.clipboard.writeText(caption);
      toaster("Caption copied to clipboard!");
    } finally {
      setTimeout(() => setCopyLoadingId(null), 800); // brief spinner
    }
  };
  const handleEdit = (id, caption) => {
    setEditId(id);
    setEditText(caption);
  };
  const handleEditSave = async (id) => {
    try {
      const payload = {
        uuid: id,
        caption: editText,
        userId: auth.currentUser?.uid,
      };
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("No auth token");
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/update-caption",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Failed to update caption");
      const updatedCaption = await response.json();
      setCaptions((prev) =>
        prev.map((c) => (c.id === id ? { ...c, caption: editText } : c))
      );
      toaster(updatedCaption.response);
      // toaster("Caption updated successfully!");
    } catch (error) {
      console.error("Error updating caption:", error);
      toaster("Failed to update caption.");
    } finally {
      setEditId(null);
      setEditText("");
    }
    // toaster("Caption updated successfully!");
  };
  const handleDelete = async (id) => {
    setDeleteLoadingId(id);
    try {
      const payload = {
        uuid: id,
        userId: auth.currentUser?.uid,
      };
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("No auth token");
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/delete-caption",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Failed to Delete caption");
      const updatedCaption = await response.json();
      setCaptions(captions.filter((c) => c.id !== id));
      toaster(updatedCaption.response);
      // toaster("Caption updated successfully!");
    } catch (error) {
      console.error("Error Deleting caption:", error);
      toaster("Failed to Delete caption.");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  // Reset pagination if filters change
  React.useEffect(() => {
    setPage(1);
  }, [platformFilter, toneFilter]);

  // Optionally, show a toast or feedback on copy, edit, or delete

  return (
    <div className="max-w-5xl w-full mx-auto p-6">
      <h2 className="mb-1 text-center text-2xl font-bold text-[var(--color-primary)]">
        Saved Captions
      </h2>
      <div className="w-full flex justify-center my-4">
        <div className="w-full max-w-md border-b border-border" />
      </div>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Enter your idea and preferences to generate captions.
      </p>
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="platform-filter" className={"mb-1"}>
            Platform
          </Label>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger id="platform-filter" className="w-full">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              {PLATFORMS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="tone-filter" className={"mb-1"}>
            Tone
          </Label>
          <Select value={toneFilter} onValueChange={setToneFilter}>
            <SelectTrigger id="tone-filter" className="w-full">
              <SelectValue placeholder="Tone" />
            </SelectTrigger>
            <SelectContent>
              {TONES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className=" p-4">
        {loading ? (
          <div className="flex justify-center items-center py-28">
            <Loader className="animate-spin w-8 h-8 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">
              Loading captions...
            </span>
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No captions found.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {paginated.map((c, index) => (
              <li key={c.id} className="py-4 flex items-center gap-3">
                <span className="flex-1 text-[var(--color-muted-foreground)] break-words">
                  {c.caption}
                </span>
                <span className="text-xs text-muted-foreground min-w-[80px] text-right">
                  {c.platform} / {c.tone}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(c.id, c.caption)}
                  title="Copy"
                  disabled={!!copyLoadingId}
                >
                  {copyLoadingId === c.id ? (
                    <Loader className="animate-spin w-4 h-4" />
                  ) : (
                    "Copy"
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(c.id, c.caption)}
                  title="Edit"
                  disabled={!!deleteLoadingId}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDelete(c.id)}
                  title="Delete"
                  disabled={deleteLoadingId === c.id}
                >
                  {deleteLoadingId === c.id ? (
                    <Loader className="animate-spin w-4 h-4" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between items-center mt-4">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages || 1}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      <EditCaptionDialog
        open={editId !== null}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onSave={() => handleEditSave(editId)}
        onCancel={() => {
          setEditId(null);
          setEditText("");
        }}
      />
    </div>
  );
}
