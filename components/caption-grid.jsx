import React, { useState } from "react";
import { Copy, Save, Loader } from "lucide-react";
import { toaster } from "@/utils/toaster";
import { saveCaption } from "@/utils/save-caption";

export default function CaptionGrid({ captions = [] }) {
  const [savingIdx, setSavingIdx] = useState(null);
  const [loadingCopyIdx, setLoadingCopyIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const handleSave = async (text) => {
    const captionObj = captions.find((c) =>
      typeof c === "string" ? c === text : c.text === text || c.caption === text
    );
    const platform =
      typeof captionObj === "object" ? captionObj.platform : undefined;
    const tone = typeof captionObj === "object" ? captionObj.tone : undefined;
    const idx = captions.indexOf(captionObj);
    setSavingIdx(idx);
    try {
      const res = await saveCaption(text, platform, tone);
      toaster(res.response || "Caption saved!");
    } catch (e) {
      toaster("Failed to save caption");
    } finally {
      setSavingIdx(null);
    }
  };

  const handleCopy = async (text, idx) => {
    setLoadingCopyIdx(idx);
    navigator.clipboard.writeText(text);
    toaster("Caption copied to clipboard!");
    setTimeout(() => setLoadingCopyIdx(null), 1000); // brief spinner
  };

  return (
    <div className="w-full ">
      <h3 className="mb-3 text-2xl font-bold text-[var(--color-primary)]">
        Top Generated Captions
      </h3>
      <div className="grid grid-cols-1 gap-6 auto-rows-min w-full">
        {captions.map((captionObj, idx) => {
          // Support both string and object for backward compatibility
          const text =
            typeof captionObj === "string"
              ? captionObj
              : captionObj.text || captionObj.caption;
          const platform =
            typeof captionObj === "object" ? captionObj.platform : undefined;
          const tone =
            typeof captionObj === "object" ? captionObj.tone : undefined;
          return (
            <div
              key={idx}
              className={`bg-[var(--color-popover)] rounded-2xl p-6 flex flex-col justify-between transition-colors duration-200 border border-[var(--color-border)] hover:border-[var(--color-primary)]`}
              style={{ minHeight: 110 }}
            >
              <span className="flex-1 text-[var(--color-foreground)] break-words text-base font-medium mb-2">
                {text}
              </span>
              {(platform || tone) && (
                <span className="text-xs text-muted-foreground mb-2">
                  {platform && <span>{platform}</span>}
                  {platform && tone && <span className="mx-1">/</span>}
                  {tone && <span>{tone}</span>}
                </span>
              )}
              <div className="flex flex-wrap gap-2 mt-auto">
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg border transition-colors
                    ${
                      hoveredIdx === `copy-${idx}` || loadingCopyIdx === idx
                        ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                        : "bg-transparent text-[var(--color-primary)] border-transparent hover:bg-[var(--color-accent)] hover:border-[var(--color-border)]"
                    }
                  `}
                  title="Copy"
                  onClick={() => handleCopy(text, idx)}
                  aria-label="Copy caption"
                  onMouseEnter={() => setHoveredIdx(`copy-${idx}`)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  disabled={loadingCopyIdx === idx}
                >
                  {loadingCopyIdx === idx ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <Copy size={18} />
                  )}
                  <span className="hidden sm:inline">Copy</span>
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg border transition-colors disabled:opacity-60
                    ${
                      hoveredIdx === `save-${idx}` || savingIdx === idx
                        ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                        : "bg-transparent text-[var(--color-primary)] border-transparent hover:bg-[var(--color-accent)] hover:border-[var(--color-border)]"
                    }
                  `}
                  title="Save"
                  onClick={() => handleSave(text)}
                  aria-label="Save caption"
                  onMouseEnter={() => setHoveredIdx(`save-${idx}`)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  disabled={savingIdx === idx}
                >
                  {savingIdx === idx ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      <span className="hidden sm:inline">Save</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span className="hidden sm:inline">Save</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
