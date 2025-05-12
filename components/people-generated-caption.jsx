import React from 'react'
import CaptionGrid from './caption-grid'
import { toaster } from '@/utils/toaster';

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

export default function PeopleGeneratedCption() {
    const handleCopy = (caption) => {
      navigator.clipboard.writeText(caption);
      toaster("Caption copied to clipboard!");
    };
  
    const handleSave = (caption) => {
      // Placeholder: Save logic
      toaster("Caption saved!");
    };
  
  return (
    <>
     <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)]">
                  People Generated Captions
                </h3>
                <CaptionGrid
                  captions={TOP_CAPTIONS}
                  onCopy={handleCopy}
                  onSave={handleSave}
                />
    </>
  )
}
