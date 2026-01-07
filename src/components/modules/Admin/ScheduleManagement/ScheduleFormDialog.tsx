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
import { createSchedule } from "@/services/admin/scheduleManagement";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IScheduleFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ScheduleFormDialog = ({
  open,
  onClose,
  onSuccess,
}: IScheduleFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [state, formAction, pending] = useActionState(createSchedule, null);

  const prevStateRef = useRef(state);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Initialize dates when dialog opens
  useEffect(() => {
    if (open && !startDate) {
      const today = getTodayDate();
      setStartDate(today);
      setEndDate(today);
    }
  }, [open, startDate]);

  const handleClose = () => {
    formRef.current?.reset();
    setStartDate("");
    setEndDate("");
    onClose();
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    
    // If end date is before start date, update it to match start date
    if (endDate && newStartDate > endDate) {
      setEndDate(newStartDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      toast.success(state.message);
      if (formRef.current) {
        formRef.current.reset();
      }
      setStartDate("");
      setEndDate("");
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
          <DialogTitle>Add New Schedule</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Start Date Field */}
            <Field>
              <FieldLabel htmlFor="startDate">Start Date *</FieldLabel>
              <Input
                name="startDate"
                id="startDate"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                min={getTodayDate()}
                required
                disabled={pending}
              />
              <InputFieldError state={state} field="startDate" />
              <p className="text-xs text-muted-foreground mt-1">
                Select the start date for this schedule
              </p>
            </Field>

            {/* End Date Field */}
            <Field>
              <FieldLabel htmlFor="endDate">End Date *</FieldLabel>
              <Input
                name="endDate"
                id="endDate"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                min={startDate || getTodayDate()}
                required
                disabled={pending}
              />
              <InputFieldError state={state} field="endDate" />
              <p className="text-xs text-muted-foreground mt-1">
                Select the end date (must be same or after start date)
              </p>
            </Field>

            {/* Start Time Field */}
            <Field>
              <FieldLabel htmlFor="startTime">Start Time *</FieldLabel>
              <Input
                name="startTime"
                id="startTime"
                type="time"
                defaultValue="09:00"
                required
                disabled={pending}
              />
              <InputFieldError state={state} field="startTime" />
              <p className="text-xs text-muted-foreground mt-1">
                Set the start time for appointments
              </p>
            </Field>

            {/* End Time Field */}
            <Field>
              <FieldLabel htmlFor="endTime">End Time *</FieldLabel>
              <Input
                name="endTime"
                id="endTime"
                type="time"
                defaultValue="17:00"
                required
                disabled={pending}
              />
              <InputFieldError state={state} field="endTime" />
              <p className="text-xs text-muted-foreground mt-1">
                Set the end time for appointments
              </p>
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
              {pending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleFormDialog;