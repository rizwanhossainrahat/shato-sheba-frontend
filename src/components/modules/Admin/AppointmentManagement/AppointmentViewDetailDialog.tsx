"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/formatters";
import { AppointmentStatus, IAppointment, PaymentStatus } from "@/types/appointments.interface";
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  Mail, 
  Phone, 
  Stethoscope, 
  User, 
  Video,
  Timer
} from "lucide-react";

interface IAppointmentViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  appointment: IAppointment | null;
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

const getStatusColor = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
      return "bg-blue-100 text-blue-800";
    case AppointmentStatus.INPROGRESS:
      return "bg-yellow-100 text-yellow-800";
    case AppointmentStatus.COMPLETED:
      return "bg-green-100 text-green-800";
    case AppointmentStatus.CANCELED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AppointmentViewDetailDialog = ({
  open,
  onClose,
  appointment,
}: IAppointmentViewDetailDialogProps) => {
  if (!appointment) return null;

  const scheduleStart = appointment.schedule && appointment.schedule.startDateTime ? new Date(appointment.schedule.startDateTime) : null;
  const scheduleEnd = appointment.schedule && appointment.schedule.endDateTime ? new Date(appointment.schedule.endDateTime) : null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Appointment Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Header with Status */}
          <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg mb-6">
            <div className="h-20 w-20 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Calendar className="h-10 w-10 text-cyan-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Appointment #{appointment.id.slice(0, 8)}</h2>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
                <Badge variant={appointment.paymentStatus === PaymentStatus.PAID ? "default" : "destructive"}>
                  <CreditCard className="h-3 w-3 mr-1" />
                  {appointment.paymentStatus}
                </Badge>
                {appointment.videoCallingId && (
                  <Badge variant="secondary">
                    <Video className="h-3 w-3 mr-1" />
                    Video Call Available
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Appointment Overview */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Appointment Overview</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow
                  label="Status"
                  value={
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  }
                />
                <InfoRow
                  label="Payment Status"
                  value={
                    <Badge variant={appointment.paymentStatus === PaymentStatus.PAID ? "default" : "destructive"}>
                      {appointment.paymentStatus}
                    </Badge>
                  }
                />
                {appointment.videoCallingId && (
                  <InfoRow
                    label="Video Calling ID"
                    value={
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {appointment.videoCallingId}
                      </code>
                    }
                  />
                )}
              </div>
            </div>

            <Separator />

            {/* Patient Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">Patient Information</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-white shadow">
                    <AvatarImage src={appointment.patient?.profilePhoto || ""} />
                    <AvatarFallback>
                      {getInitials(appointment.patient?.name || "N/A")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{appointment.patient?.name || "N/A"}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {appointment.patient?.email || "N/A"}
                    </p>
                    {appointment.patient?.contactNumber && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {appointment.patient.contactNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Doctor Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Doctor Information</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-white shadow">
                    <AvatarImage src={appointment.doctor?.profilePhoto || ""} />
                    <AvatarFallback>
                      {getInitials(appointment.doctor?.name || "N/A")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{appointment.doctor?.name || "N/A"}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {appointment.doctor?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Schedule Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Schedule Details</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                {scheduleStart && (
                  <>
                    <InfoRow
                      label="Date"
                      value={scheduleStart.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    />
                    <InfoRow
                      label="Start Time"
                      value={
                        <Badge variant="outline">
                          {scheduleStart.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </Badge>
                      }
                    />
                  </>
                )}
                {scheduleEnd && (
                  <InfoRow
                    label="End Time"
                    value={
                      <Badge variant="outline">
                        {scheduleEnd.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Badge>
                    }
                  />
                )}
                {scheduleStart && scheduleEnd && (
                  <InfoRow
                    label="Duration"
                    value={(() => {
                      const diffMs = scheduleEnd.getTime() - scheduleStart.getTime();
                      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                      return (
                        <Badge variant="secondary">
                          {diffHours > 0 && `${diffHours}h `}
                          {diffMinutes > 0 && `${diffMinutes}m`}
                          {diffHours === 0 && diffMinutes === 0 && "0m"}
                        </Badge>
                      );
                    })()}
                  />
                )}
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Timer className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-lg">Timestamps</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow
                  label="Created"
                  value={new Date(appointment.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
                <InfoRow
                  label="Last Updated"
                  value={new Date(appointment.updatedAt).toLocaleDateString("en-US", {
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

export default AppointmentViewDetailDialog;