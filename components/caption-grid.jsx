import React, { useState } from "react";
import { Copy, Save, Pencil, ThumbsUp } from "lucide-react";
import EditCaptionDialog from "@/components/edit-caption-dialog";

export default function CaptionGrid({ captions = [], onCopy, onSave, onEdit }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [likes, setLikes] = useState(Array(captions.length).fill(0));

  const handleEditClick = (idx) => {
    setEditIdx(idx);
    setEditValue(captions[idx]?.text || "");
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

  const handleLike = (idx) => {
    setLikes((prev) => {
      const updated = [...prev];
      updated[idx] = (updated[idx] || 0) + 1;
      return updated;
    });
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
            typeof captionObj === "string" ? captionObj : captionObj.text;
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
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-transparent hover:bg-[var(--color-accent)] text-[var(--color-primary)] border border-transparent hover:border-[var(--color-border)] transition-colors"
                  title="Save"
                  onClick={() => onSave(text)}
                  aria-label="Save caption"
                >
                  <Save size={18} />
                  <span className="hidden sm:inline">Save</span>
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
                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-transparent hover:bg-[var(--color-accent)] text-[var(--color-primary)] border border-transparent hover:border-[var(--color-border)] transition-colors"
                  title="Like"
                  onClick={() => handleLike(idx)}
                  aria-label="Like caption"
                  type="button"
                >
                  <ThumbsUp size={18} />
                  <span className="hidden sm:inline">Like</span>
                  <span className="ml-1">{likes[idx] || 0}</span>
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
