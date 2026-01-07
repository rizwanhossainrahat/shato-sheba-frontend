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
import { createAdmin, updateAdmin } from "@/services/admin/adminManagement";
import { IAdmin } from "@/types/admin.interface";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IAdminFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  admin?: IAdmin;
}

const AdminFormDialog = ({
  open,
  onClose,
  onSuccess,
  admin,
}: IAdminFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!admin;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const [state, formAction, pending] = useActionState(
    isEdit ? updateAdmin.bind(null, admin.id!) : createAdmin,
    null
  );

  const prevStateRef = useRef(state);

  const handleClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (selectedFile) {
      setSelectedFile(null);
    }
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

      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, onSuccess, onClose, selectedFile]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Admin" : "Add New Admin"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name Field */}
            <Field>
              <FieldLabel htmlFor="name">Name *</FieldLabel>
              <Input
                name="name"
                id="name"
                defaultValue={admin?.name}
                required
                disabled={pending}
              />
              <InputFieldError state={state} field="name" />
            </Field>

            {/* Email Field - Create Only */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="email">Email *</FieldLabel>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  required
                  disabled={pending}
                />
                <InputFieldError state={state} field="email" />
              </Field>
            )}

            {/* Password Field - Create Only */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="password">Password *</FieldLabel>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  required
                  disabled={pending}
                />
                <InputFieldError state={state} field="password" />
              </Field>
            )}

            {/* Contact Number Field */}
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number *</FieldLabel>
              <Input
                name="contactNumber"
                id="contactNumber"
                defaultValue={admin?.contactNumber}
                required
                disabled={pending}
              />
              <InputFieldError state={state} field="contactNumber" />
            </Field>

            {/* Profile Photo Field - Create Only */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Profile Photo *</FieldLabel>
                <Input
                  ref={fileInputRef}
                  name="file"
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  disabled={pending}
                />
                <InputFieldError state={state} field="profilePhoto" />
              </Field>
            )}
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
              {pending ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminFormDialog;