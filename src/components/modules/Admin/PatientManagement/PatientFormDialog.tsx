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
import { Textarea } from "@/components/ui/textarea";
import { updatePatient } from "@/services/admin/patientManagement";
import { IPatient } from "@/types/patient.interface";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface IPatientFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  patient: IPatient;
}

const PatientFormDialog = ({
  open,
  onClose,
  onSuccess,
  patient,
}: IPatientFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(
    updatePatient.bind(null, patient.id!),
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
          <DialogTitle>Edit Patient</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name Field */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                name="name"
                id="name"
                defaultValue={patient.name}
                disabled={pending}
              />
              <InputFieldError state={state} field="name" />
            </Field>

            {/* Contact Number Field */}
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                name="contactNumber"
                id="contactNumber"
                defaultValue={patient.contactNumber}
                disabled={pending}
              />
              <InputFieldError state={state} field="contactNumber" />
            </Field>

            {/* Address Field */}
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Textarea
                name="address"
                id="address"
                defaultValue={patient.address}
                disabled={pending}
                rows={3}
              />
              <InputFieldError state={state} field="address" />
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
              {pending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientFormDialog;