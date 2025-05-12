import { UnlockIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
const PLATFORMS = ["Instagram", "LinkedIn", "Twitter"];
const TONES = ["Funny", "Professional", "Relatable", "Motivational", "Casual"];
const PREMIUM_CAPTIONS = [
  {
    text: "Unlock exclusive captions for your brand!",
    platform: PLATFORMS[0],
    tone: TONES[1],
  },
  {
    text: "Stand out with premium, AI-crafted captions.",
    platform: PLATFORMS[1],
    tone: TONES[2],
  },
  {
    text: "Captions that convert: only for premium users!",
    platform: PLATFORMS[2],
    tone: TONES[3],
  },
];
export default function PremiumCaption() {
  return (
    <div className="relative">
        {/* Premium Captions Section */}
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <UnlockIcon />
        Premium Captions
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold">
          Premium
        </span>
      </h3>
      <div className="grid grid-cols-1 gap-6 auto-rows-min w-full mb-6">
        {PREMIUM_CAPTIONS.map((caption, idx) => (
          <div
            key={idx}
            className="relative bg-[var(--color-popover)] rounded-2xl p-6 border border-[var(--color-border)] flex flex-col justify-between min-h-[110px] overflow-hidden"
            style={{
              filter: "blur(4px)",
              pointerEvents: "none",
              opacity: 0.7,
            }}
          >
            <span className="flex-1 text-[var(--color-foreground)] break-words text-base font-medium mb-2">
              {caption.text}
            </span>
            <span className="text-xs text-muted-foreground mb-2">
              {caption.platform} / {caption.tone}
            </span>
          </div>
        ))}
        <Link href={"/dashboard/pricing"}>
          <button
            className="absolute flex gap-2 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 font-semibold px-6 py-2 rounded-lg shadow-lg border-2 text-lg transition-all"
            style={{
              pointerEvents: "auto",
              position: "absolute",
              marginTop: "60px",
              background: "var(--color-accent)",
              color: "var(--color-accent-foreground)",
              borderColor: "var(--color-accent)",
            }}
          >
            <UnlockIcon />
            Upgrade Account to see this
          </button>
        </Link>
      </div>
    </div>
  )
}
