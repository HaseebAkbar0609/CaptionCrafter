"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toaster } from "@/utils/toaster";
import { useTheme } from "next-themes";
import {  Lock, Unlock, Sparkles, UnlockIcon } from "lucide-react";
import CaptionGrid from "@/components/caption-grid";
import Link from "next/link";
import PremiumCaption from "@/components/premium-caption";

const PLATFORMS = ["Instagram", "LinkedIn", "Twitter"];
const TONES = ["Funny", "Professional", "Relatable", "Motivational", "Casual"];
const TOP_CAPTIONS = [
  {
    text: "Unleash your creativity with every post!",
    platform: PLATFORMS[0],
    tone: TONES[0],
  },
  {
    text: "Making memories, one caption at a time.",
    platform: PLATFORMS[0],
    tone: TONES[1],
  },
  {
    text: "Your story, your style, your caption.",
    platform: PLATFORMS[1],
    tone: TONES[2],
  },
  {
    text: "Share the vibe, inspire the tribe.",
    platform: PLATFORMS[2],
    tone: TONES[3],
  },
  {
    text: "Turn moments into memories with the perfect caption.Turn moments into memories with the perfect caption.Turn moments into memories with the perfect caption.Turn moments into memories with the perfect caption.Turn moments into memories with the perfect caption.",
    platform: PLATFORMS[0],
    tone: TONES[4],
  },
];


export default function GeneratePage() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState([]);
  const [visibility, setVisibility] = useState("public");
  const [hasGenerated, setHasGenerated] = useState(false);
  const loadingRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
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
    setHasGenerated(true);
    reset();
    setTimeout(() => {
      setCaptions([
        {
          text: `🌟 ${data.input} - ${data.platform} (${data.tone}) #inspired`,
          platform: data.platform,
          tone: data.tone,
        },
        {
          text: `"${data.input}" | Perfect for ${data.platform}!`,
          platform: data.platform,
          tone: data.tone,
        },
        {
          text: `${data.input} — ${data.tone} vibes only!`,
          platform: data.platform,
          tone: data.tone,
        },
        {
          text:
            `Level up your ${data.platform} with: ${data.input}` +
            (data.useHashtags ? " #trending" : ""),
          platform: data.platform,
          tone: data.tone,
        },
        {
          text: `Why not: ${data.input}? (${data.tone})`,
          platform: data.platform,
          tone: data.tone,
        },
      ]);
      setLoading(false);
    }, 1200);
    // Scroll to loading animation
    setTimeout(() => {
      if (loadingRef.current) {
        loadingRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 50);
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
  };

  return (
    <div className="w-max-full w-full flex flex-col items-center justify-center min-h-[80vh] py-10 px-2">
      <div className="w-full p-6 max-w-4xl  flex flex-col ">
        <div className="flex flex-col gap-2  mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Generate AI Caption
          </h2>

          <p className="text-sm text-muted-foreground">
            Craft the perfect caption for your social post in seconds.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  flex-col items gap-6"
        >
          <div className="grid gap-2">
            <Label
              htmlFor="caption-input"
              className="font-medium text-[var(--color-foreground)]"
            >
              Describe your post or idea
            </Label>
            <div className="relative">
              <Textarea
                id="caption-input"
                {...register("input", {
                  required: "Description is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                })}
                placeholder="E.g. Launching a new eco-friendly product"
                className={"py-2 pr-4 min-h-[90px] resize-none"}
                rows={4}
              />
              <div className="absolute left-0 right-0 flex justify-end bottom-2 px-2 pointer-events-none">
                <button
                  type="button"
                  className={`pointer-events-auto flex items-center gap-1 rounded-full px-3 py-1 transition-colors shadow font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600`}
                  title={visibility === "public" ? "Public" : "Private"}
                  onClick={() => {
                    setVisibility((v) =>
                      v === "public" ? "private" : "public"
                    );
                    setValue(
                      "visibility",
                      visibility === "public" ? "private" : "public"
                    );
                  }}
                  style={{ minWidth: 70, justifyContent: "center" }}
                >
                  {visibility === "public" ? (
                    <>
                      <Unlock size={16} className="mr-1" />
                      Public
                    </>
                  ) : (
                    <>
                      <Lock size={16} className="mr-1" />
                      Private
                    </>
                  )}
                </button>
              </div>
              <input
                type="hidden"
                {...register("visibility")}
                value={visibility}
              />
            </div>
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
            className="w-full flex items-center justify-center gap-2"
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? (
              <>
                <span className="animate-pulse flex items-center gap-2">
                  <Sparkles className="animate-spin-slow" />
                  Generating...
                </span>
              </>
            ) : (
              <>
                <Sparkles /> Generate Caption
              </>
            )}
          </Button>
        </form>
        {/* Display Top Captions before generation, loading state during, and generated captions after */}

        <div className="w-[100%] h-px bg-border my-10" />
        {/* Show Top Captions before generation */}
        {!hasGenerated && !loading && (
          <>
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)]">
              People Generated Captions
            </h3>
            <CaptionGrid
              captions={TOP_CAPTIONS}
              onCopy={handleCopy}
              onSave={handleSave}
              onEdit={() => {}}
            />
            <div className="w-[100%] h-px bg-border my-6" />
          <PremiumCaption/>
          </>
        )}
        {/* Show loading state */}
        {loading && (
          <div
            ref={loadingRef}
            className="flex justify-center items-center min-h-[120px] w-full text-lg font-medium text-[var(--color-primary)] py-8"
          >
            <span className="animate-pulse flex items-center gap-2">
              <Sparkles className="animate-spin-slow" />
              Generating...
            </span>
          </div>
        )}
        {/* After generation: show 3 generated captions, then Top Captions below */}
        {hasGenerated && !loading && captions.length > 0 && (
          <>
            <CaptionGrid
              captions={captions.slice(0, 3)}
              onCopy={handleCopy}
              onSave={handleSave}
              onRegenerate={handleRegenerate}
              onEdit={handleEdit}
            />
            <div className="w-[100%] h-px bg-border my-6" />

            <div className="w-[100%] h-px bg-border my-6" />
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)]">
              People Generated Captions
            </h3>
            <CaptionGrid
              captions={TOP_CAPTIONS}
              onCopy={handleCopy}
              onSave={handleSave}
              onEdit={() => {}}
            />
            {/* Premium Captions Section */}
           <PremiumCaption/>
          </>
        )}
      </div>
      {/* Removed Edit Popup Modal, now handled in CaptionGrid */}
    </div>
  );
}
