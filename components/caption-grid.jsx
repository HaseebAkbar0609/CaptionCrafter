import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Save, Pencil } from "lucide-react";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function CaptionGrid({ captions = [], onCopy, onSave, onEdit }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleEditClick = (idx) => {
    setEditIdx(idx);
    setEditValue(captions[idx]?.text||"");
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
              </div>
            </div>
          );
        })}
      </div>
      <Dialog open={editIdx !== null} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogTitle>Edit Caption</DialogTitle>
          <p className="mb-2 text-sm text-muted-foreground">
            Update your caption below and click Save to apply changes.
          </p>
          <textarea
            className="w-full p-2 border rounded mb-4 resize-none"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            rows={5}
            style={{ minHeight: 100 }}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button onClick={handleDialogSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
