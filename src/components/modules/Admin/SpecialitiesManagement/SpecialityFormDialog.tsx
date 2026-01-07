"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createSpeciality, updateSpeciality } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface ISpecialityFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  speciality?: ISpecialty | null;
}

const SpecialityFormDialog = ({
  open,
  onClose,
  onSuccess,
  speciality,
}: ISpecialityFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!speciality;

  const [state, formAction, pending] = useActionState(
    isEdit ? updateSpeciality.bind(null, speciality!.id) : createSpeciality,
    null
  );

  const prevStateRef = useRef(state);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      toast.success(state.message);
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Speciality" : "Add New Speciality"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Title Field */}
            <Field>
              <FieldLabel htmlFor="title">Title *</FieldLabel>
              <Input
                name="title"
                id="title"
                placeholder="Enter speciality title"
                defaultValue={speciality?.title || ""}
                required
                disabled={pending}
              />
              <InputFieldError state={state} field="title" />
            </Field>

            {/* Icon Upload Field */}
            <Field>
              <FieldLabel htmlFor="file">
                Icon {isEdit ? "(Optional - leave empty to keep current)" : "*"}
              </FieldLabel>
              <Input
                name="file"
                id="file"
                type="file"
                accept="image/*"
                required={!isEdit}
                disabled={pending}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Upload an icon image for this speciality
              </p>
              {isEdit && speciality?.icon && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Current icon:</p>
                  <img
                    src={speciality.icon}
                    alt={speciality.title}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                </div>
              )}
            </Field>
          </div>

          {/* Fixed Footer */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update" : "Create")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialityFormDialog;