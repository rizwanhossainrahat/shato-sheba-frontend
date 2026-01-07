"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ISchedule } from "@/types/schedule.interface";
import { Calendar, Clock, Timer } from "lucide-react";

interface IScheduleViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  schedule: ISchedule | null;
}

interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm font-medium text-muted-foreground">{label}:</span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

// Utility functions to safely extract date/time from either format
const getStartDate = (schedule: ISchedule): string => {
  if (schedule.startDate) return schedule.startDate;
  if (schedule.startDateTime) return schedule.startDateTime.split('T')[0];
  return '';
};

const getEndDate = (schedule: ISchedule): string => {
  if (schedule.endDate) return schedule.endDate;
  if (schedule.endDateTime) return schedule.endDateTime.split('T')[0];
  return '';
};

const getStartTime = (schedule: ISchedule): string => {
  if (schedule.startTime) return schedule.startTime;
  if (schedule.startDateTime) {
    try {
      const date = new Date(schedule.startDateTime);
      return date.toTimeString().slice(0, 5); // HH:MM format
    } catch {
      return '';
    }
  }
  return '';
};

const getEndTime = (schedule: ISchedule): string => {
  if (schedule.endTime) return schedule.endTime;
  if (schedule.endDateTime) {
    try {
      const date = new Date(schedule.endDateTime);
      return date.toTimeString().slice(0, 5); // HH:MM format
    } catch {
      return '';
    }
  }
  return '';
};

const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return 'N/A';
  }
};

const ScheduleViewDetailDialog = ({
  open,
  onClose,
  schedule,
}: IScheduleViewDetailDialogProps) => {
  if (!schedule) return null;

  // Parse time strings (HH:MM format) to calculate duration with safety checks
  let diffHours = 0;
  let remainingMinutes = 0;

  const startTime = getStartTime(schedule);
  const endTime = getEndTime(schedule);
  const startDate = getStartDate(schedule);

  if (startTime && endTime) {
    try {
      const [startHour, startMin] = startTime.split(':').map(Number);
      const [endHour, endMin] = endTime.split(':').map(Number);
      
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      const diffMinutes = endMinutes - startMinutes;
      
      diffHours = Math.floor(diffMinutes / 60);
      remainingMinutes = diffMinutes % 60;
    } catch (error) {
      console.error("Error parsing time:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Schedule Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Header with Duration */}
          <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg mb-6">
            <div className="h-20 w-20 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Calendar className="h-10 w-10 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {formatDisplayDate(startDate)}
              </h2>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">
                  <Timer className="h-3 w-3 mr-1" />
                  {diffHours > 0 && `${diffHours}h `}
                  {remainingMinutes > 0 && `${remainingMinutes}m`}
                  {diffHours === 0 && remainingMinutes === 0 && "0m"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Date Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Date Information</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow
                  label="Start Date"
                  value={formatDisplayDate(getStartDate(schedule))}
                />
                <InfoRow
                  label="End Date"
                  value={formatDisplayDate(getEndDate(schedule))}
                />
              </div>
            </div>

            <Separator />

            {/* Time Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">Time Information</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow
                  label="Start Time"
                  value={
                    <Badge variant="outline">
                      {startTime || "N/A"}
                    </Badge>
                  }
                />
                <InfoRow
                  label="End Time"
                  value={
                    <Badge variant="outline">
                      {endTime || "N/A"}
                    </Badge>
                  }
                />
                <InfoRow
                  label="Duration"
                  value={
                    <Badge variant="secondary">
                      {diffHours > 0 && `${diffHours} hour${diffHours > 1 ? "s" : ""} `}
                      {remainingMinutes > 0 && `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`}
                      {diffHours === 0 && remainingMinutes === 0 && "0 minutes"}
                    </Badge>
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Timer className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Timestamps</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow
                  label="Created"
                  value={new Date(schedule.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
                <InfoRow
                  label="Last Updated"
                  value={new Date(schedule.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleViewDetailDialog;