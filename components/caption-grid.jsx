import React, { useState } from "react";
import { Copy, Save, Pencil } from "lucide-react";
import EditCaptionDialog from "@/components/edit-caption-dialog";
import { toaster } from "@/utils/toaster";
import { saveCaption } from "@/utils/save-caption";

export default function CaptionGrid({ captions = [], onCopy, onSave, onEdit }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [savingIdx, setSavingIdx] = useState(null);

  const handleEditClick = (idx) => {
    setEditIdx(idx);
    setEditValue(captions[idx]?.text || captions[idx]?.caption || "");
  };

  const handleDialogSave = () => {
    if (onEdit && editIdx !== null) {
      onEdit(editIdx, editValue);
    }
    setEditIdx(null);
    setEditValue("");
  };

  const handleDialogClose = () => {
    setEditIdx(null);
    setEditValue("");
  };

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
      const res=await saveCaption(text, platform, tone);
      toaster(res.response||"Caption saved!");
    } catch (e) {
      toaster("Failed to save caption");
    } finally {
      setSavingIdx(null);
    }
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
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-transparent hover:bg-[var(--color-accent)] text-[var(--color-primary)] border border-transparent hover:border-[var(--color-border)] transition-colors"
                  title="Copy"
                  onClick={() => onCopy(text)}
                  aria-label="Copy caption"
                >
                  <Copy size={18} />
                  <span className="hidden sm:inline">Copy</span>
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-transparent hover:bg-[var(--color-accent)] text-[var(--color-primary)] border border-transparent hover:border-[var(--color-border)] transition-colors disabled:opacity-60"
                  title="Save"
                  onClick={() => handleSave(text)}
                  aria-label="Save caption"
                  disabled={savingIdx === idx}
                >
                  {savingIdx === idx ? (
                    <span className="animate-pulse">Saving...</span>
                  ) : (
                    <>
                      <Save size={18} />
                      <span className="hidden sm:inline">Save</span>
                    </>
                  )}
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-transparent hover:bg-[var(--color-accent)] text-[var(--color-primary)] border border-transparent hover:border-[var(--color-border)] transition-colors"
                  title="Edit"
                  onClick={() => handleEditClick(idx)}
                  aria-label="Edit caption"
                >
                  <Pencil size={18} />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <EditCaptionDialog
        open={editIdx !== null}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onSave={handleDialogSave}
        onCancel={handleDialogClose}
      />
    </div>
  );
}
