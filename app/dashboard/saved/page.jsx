"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const MOCK_CAPTIONS = [
  {
    id: 1,
    text: "Chasing dreams, not people.",
    platform: "Instagram",
    tone: "Relatable",
  },
  {
    id: 2,
    text: "Stay close to people who feel like sunlight.",
    platform: "LinkedIn",
    tone: "Professional",
  },
  {
    id: 3,
    text: "Create your own sunshine.",
    platform: "Twitter",
    tone: "Motivational",
  },
  {
    id: 4,
    text: "Less perfection, more authenticity.",
    platform: "Instagram",
    tone: "Funny",
  },
  {
    id: 5,
    text: "Sunsets are proof that endings can be beautiful too.",
    platform: "Instagram",
    tone: "Relatable",
  },
  {
    id: 6,
    text: "Launching our new eco-friendly product line! 🌱 Sustainable, stylish, and made for you. #GoGreen #EcoFriendly #Sustainability #NewLaunch #ShopNow #EarthLover #GreenLiving #EcoWarrior #SustainableStyle #ConsciousConsumer",
    platform: "Instagram",
    tone: "Motivational",
  },
  {
    id: 7,
    text: "Excited to announce our partnership with @TechInnovate! Together, we're building smarter solutions for a better tomorrow. 🚀 #Innovation #TechNews #Collaboration #Future #Growth #Business #LinkedInUpdates #Networking #Leadership #Success",
    platform: "LinkedIn",
    tone: "Professional",
  },
  {
    id: 8,
    text: "Monday mood: Coffee in one hand, confidence in the other. Ready to conquer the week! ☕💪 #MondayMotivation #WorkLife #Hustle #Productivity #Mindset #Goals #Inspiration #MotivationMonday #SuccessMindset #DreamBig",
    platform: "Twitter",
    tone: "Funny",
  },
  {
    id: 9,
    text: "Just hit 10,000 followers! Thank you for being part of this amazing journey. Your support means the world to me. 🙏💖 #Grateful #Milestone #ThankYou #Followers #Community #Support #Journey #SocialMedia #Growth #Blessed",
    platform: "Instagram",
    tone: "Relatable",
  },
  {
    id: 10,
    text: "Pro tip: When in doubt, add more coffee. ☕️ #ProductivityHacks #WorkSmart #OfficeLife #CoffeeAddict #Motivation #Tips #WorkFromHome #Efficiency #MondayBlues #StayFocused",
    platform: "LinkedIn",
    tone: "Funny",
  },
];
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
  const [captions, setCaptions] = useState(MOCK_CAPTIONS);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [toneFilter, setToneFilter] = useState("All");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const filtered = captions.filter(
    (c) =>
      (platformFilter === "All" || c.platform === platformFilter) &&
      (toneFilter === "All" || c.tone === toneFilter)
  );
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };
  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };
  const handleEditSave = (id) => {
    setCaptions(
      captions.map((c) => (c.id === id ? { ...c, text: editText } : c))
    );
    setEditId(null);
    setEditText("");
  };
  const handleDelete = (id) => {
    setCaptions(captions.filter((c) => c.id !== id));
  };

  // Reset pagination if filters change
  React.useEffect(() => {
    setPage(1);
  }, [platformFilter, toneFilter]);

  // Optionally, show a toast or feedback on copy, edit, or delete

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
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
        {paginated.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No captions found.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {paginated.map((c) => (
              <li key={c.id} className="py-4 flex items-center gap-3">
                {editId === c.id ? (
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEditSave(c.id);
                      if (e.key === "Escape") {
                        setEditId(null);
                        setEditText("");
                      }
                    }}
                  />
                ) : (
                  <span className="flex-1 text-[var(--color-muted-foreground)] break-words">
                    {c.text}
                  </span>
                )}
                <span className="text-xs text-muted-foreground min-w-[80px] text-right">
                  {c.platform} / {c.tone}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(c.text)}
                  title="Copy"
                >
                  Copy
                </Button>
                {editId === c.id ? (
                  <Button
                    size="sm"
                    onClick={() => handleEditSave(c.id)}
                    title="Save"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(c.id, c.text)}
                    title="Edit"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => handleDelete(c.id)}
                  title="Delete"
                >
                  Delete
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
    </div>
  );
}
