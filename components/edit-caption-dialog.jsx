import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function EditCaptionDialog({
  open,
  value,
  onChange,
  onSave,
  onCancel,
}) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogTitle>Edit Caption</DialogTitle>
        <p className="mb-2 text-sm text-muted-foreground">
          Update your caption below and click Save to apply changes.
        </p>
        <textarea
          className="w-full p-2 border rounded mb-4 resize-none"
          value={value}
          onChange={onChange}
          rows={5}
          style={{ minHeight: 100 }}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
