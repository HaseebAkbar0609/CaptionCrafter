"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toaster } from "@/utils/toaster";
import { useTheme } from "next-themes";

const PLATFORMS = ["Instagram", "LinkedIn", "Twitter"];
const TONES = ["Funny", "Professional", "Relatable", "Motivational", "Casual"];

export default function GeneratePage() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      input: "",
      platform: PLATFORMS[0],
      tone: TONES[0],
      useHashtags: false,
    },
  });

  // Mock AI generation
  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setCaptions([
        `🌟 ${data.input} - ${data.platform} (${data.tone}) #inspired`,
        `"${data.input}" | Perfect for ${data.platform}!`,
        `${data.input} — ${data.tone} vibes only!`,
        `Level up your ${data.platform} with: ${data.input}` +
          (data.useHashtags ? " #trending" : ""),
        `Why not: ${data.input}? (${data.tone})`,
      ]);
      setLoading(false);
    }, 1200);
  };

  const handleCopy = (caption) => {
    navigator.clipboard.writeText(caption);
    toaster("Caption copied to clipboard!", theme);
  };

  const handleSave = (caption) => {
    // Placeholder: Save logic
    alert("Saved: " + caption);
  };

  const handleRegenerate = (idx) => {
    const data = watch();
    const newCaption = `${data.input} (Regenerated ${idx + 1})`;
    setCaptions((prev) => prev.map((c, i) => (i === idx ? newCaption : c)));
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditValue(captions[idx]);
  };

  const handleEditSave = () => {
    setCaptions((prev) => prev.map((c, i) => (i === editIdx ? editValue : c)));
    setEditIdx(null);
    setEditValue("");
    toaster("Caption updated!", theme);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditValue("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-10 px-2">
      <div className="w-full max-w-2xl p-6  ">
        <div className="flex flex-col items-center gap-2 text-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Generate AI Caption
          </h2>

          <p className="text-sm text-muted-foreground">
            Craft the perfect caption for your social post in seconds.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label
              htmlFor="caption-input"
              className="font-medium text-[var(--color-foreground)]"
            >
              Describe your post or idea
            </Label>
            <Input
              id="caption-input"
              type="text"
              {...register("input", {
                required: "Description is required",
                minLength: { value: 3, message: "At least 3 characters" },
              })}
              placeholder="E.g. Launching a new eco-friendly product"
              className={"py-2"}
            />
            {errors.input && (
              <span className="text-red-500 text-xs">
                {errors.input.message}
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1 grid gap-2">
              <Label className="text-sm" htmlFor="platform-select">
                Platform
              </Label>
              <Select
                defaultValue={PLATFORMS[0]}
                {...register("platform", { required: true })}
                onValueChange={(value) => setValue("platform", value)}
                value={watch("platform")}
              >
                <SelectTrigger id="platform-select" className="w-full">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.platform && (
                <span className="text-red-500 text-xs">
                  Platform is required
                </span>
              )}
            </div>
            <div className="flex-1 grid gap-2">
              <Label className="text-sm" htmlFor="tone-select">
                Tone
              </Label>
              <Select
                defaultValue={TONES[0]}
                {...register("tone", { required: true })}
                onValueChange={(value) => setValue("tone", value)}
                value={watch("tone")}
              >
                <SelectTrigger id="tone-select" className="w-full">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tone && (
                <span className="text-red-500 text-xs">Tone is required</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="hashtags"
              type="checkbox"
              className="mr-2 accent-primary"
              {...register("useHashtags")}
            />
            <Label htmlFor="hashtags" className="text-sm">
              Include trending hashtags
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? "Generating..." : "Generate Caption"}
          </Button>
        </form>
        {captions.length > 0 && (
          <div className="bg-[var(--color-popover)] border border-[var(--color-border)] rounded-lg p-6 mt-8">
            <h3 className="mb-3 text-lg font-semibold text-[var(--color-foreground)]">
              AI-Generated Captions
            </h3>
            <ul className="space-y-4">
              {captions.map((caption, idx) => (
                <li
                  key={idx}
                  className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-3 w-full"
                >
                  <span className="flex-1 text-[var(--color-muted-foreground)] break-words text-sm sm:text-base">
                    {caption}
                  </span>
                  <div className="flex gap-2 sm:flex-col">
                    <button
                      className="px-2 py-1 rounded bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] text-xs font-medium"
                      title="Copy"
                      onClick={() => handleCopy(caption)}
                    >
                      Copy ✨
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] text-xs font-medium"
                      title="Save"
                      onClick={() => handleSave(caption)}
                    >
                      Save 💾
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] text-xs font-medium"
                      title="Regenerate"
                      onClick={() => handleRegenerate(idx)}
                    >
                      Regenerate 🔄
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] text-xs font-medium"
                      title="Edit"
                      onClick={() => handleEdit(idx)}
                    >
                      Edit ✏️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Edit Popup Modal */}
      {editIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
            onClick={handleEditCancel}
          ></div>
          <div className="relative w-[90vw] max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 animate-fade-in flex flex-col">
            <h4 className="mb-2 font-semibold text-lg text-center">
              Edit Caption
            </h4>
            <textarea
              className="w-full border rounded p-2 mb-4 text-black dark:text-white bg-white dark:bg-zinc-800 resize-none focus:ring-2 focus:ring-[var(--color-primary)]"
              rows={4}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 rounded bg-[var(--color-primary)] text-white font-medium hover:opacity-90"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="px-4 py-1 rounded bg-[var(--color-secondary)] text-[var(--color-foreground)] font-medium hover:bg-[var(--color-accent)]"
                onClick={handleEditCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
