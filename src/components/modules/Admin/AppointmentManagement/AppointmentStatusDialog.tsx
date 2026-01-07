"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateAppointmentStatus } from "@/services/admin/appointmentManagement";
import { AppointmentStatus, IAppointment } from "@/types/appointments.interface";
import { useState } from "react";
import { toast } from "sonner";

interface IAppointmentStatusDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  appointment: IAppointment;
}

const AppointmentStatusDialog = ({
  open,
  onClose,
  onSuccess,
  appointment,
}: IAppointmentStatusDialogProps) => {
  const [status, setStatus] = useState<string>(appointment.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClose = () => {
    setStatus(appointment.status);
    onClose();
  };

  const handleSubmit = async () => {
    if (status === appointment.status) {
      toast.info("No changes made");
      onClose();
      return;
    }

    setIsUpdating(true);
    const result = await updateAppointmentStatus(appointment.id, status);
    setIsUpdating(false);

    if (result.success) {
      toast.success(result.message);
      onSuccess();
      onClose();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Appointment Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Field>
            <FieldLabel>Current Status</FieldLabel>
            <div className="text-sm text-muted-foreground">
              {appointment.status}
            </div>
          </Field>

          <Field>
            <FieldLabel>New Status</FieldLabel>
            <Select value={status} onValueChange={setStatus} disabled={isUpdating}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={AppointmentStatus.SCHEDULED}>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Scheduled
                  </span>
                </SelectItem>
                <SelectItem value={AppointmentStatus.INPROGRESS}>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    In Progress
                  </span>
                </SelectItem>
                <SelectItem value={AppointmentStatus.COMPLETED}>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Completed
                  </span>
                </SelectItem>
                <SelectItem value={AppointmentStatus.CANCELED}>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Canceled
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Status"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentStatusDialog;