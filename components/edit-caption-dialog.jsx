import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function EditCaptionDialog({
  open,
  value,
  onChange,
  onSave,
  onCancel,
}) {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    Promise.resolve(onSave()).finally(() => setLoading(false));
  };

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
          disabled={loading}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin w-4 h-4" /> Saving...
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
