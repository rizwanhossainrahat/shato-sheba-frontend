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
import { IPatient } from "@/types/patient.interface";
import { 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Heart, 
  FileText,
  Calendar,
  Activity
} from "lucide-react";

interface IPatientViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  patient: IPatient | null;
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

const PatientViewDetailDialog = ({
  open,
  onClose,
  patient,
}: IPatientViewDetailDialogProps) => {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Patient Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Header with Avatar */}
          <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={patient.profilePhoto || ""} />
              <AvatarFallback className="text-lg">
                {getInitials(patient.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-3xl font-bold">{patient.name}</h2>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" />
                {patient.email}
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant={patient.isDeleted ? "destructive" : "default"}>
                  {patient.isDeleted ? "Inactive" : "Active"}
                </Badge>
                <Badge variant="secondary">
                  <Heart className="h-3 w-3 mr-1" />
                  Patient
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Personal Information</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow label="Full Name" value={patient.name} />
                <InfoRow label="Email Address" value={patient.email} />
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">Contact Information</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow label="Contact Number" value={patient.contactNumber} />
                <InfoRow 
                  label="Address" 
                  value={
                    <div className="flex items-start gap-1 text-right">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{patient.address}</span>
                    </div>
                  } 
                />
              </div>
            </div>

            <Separator />

            {/* Health Information */}
            {patient.patientHealthData && (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="h-5 w-5 text-red-600" />
                    <h3 className="font-semibold text-lg">Health Information</h3>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <InfoRow 
                      label="Gender" 
                      value={patient.patientHealthData.gender} 
                    />
                    <InfoRow 
                      label="Date of Birth" 
                      value={new Date(patient.patientHealthData.dateOfBirth).toLocaleDateString()} 
                    />
                    <InfoRow 
                      label="Blood Group" 
                      value={patient.patientHealthData.bloodGroup.replace('_', ' ')} 
                    />
                    <InfoRow 
                      label="Height" 
                      value={patient.patientHealthData.height} 
                    />
                    <InfoRow 
                      label="Weight" 
                      value={patient.patientHealthData.weight} 
                    />
                    {patient.patientHealthData.hasAllergies !== undefined && (
                      <InfoRow 
                        label="Allergies" 
                        value={patient.patientHealthData.hasAllergies ? "Yes" : "No"} 
                      />
                    )}
                    {patient.patientHealthData.hasDiabetes !== undefined && (
                      <InfoRow 
                        label="Diabetes" 
                        value={patient.patientHealthData.hasDiabetes ? "Yes" : "No"} 
                      />
                    )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Medical Reports - Temporarily disabled due to missing database table */}
            {/* TODO: Re-enable when medical_reports table is created in database */}

            {/* Account Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Account Information</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow
                  label="Status"
                  value={
                    <Badge variant={patient.isDeleted ? "destructive" : "default"}>
                      {patient.isDeleted ? "Inactive" : "Active"}
                    </Badge>
                  }
                />
                <InfoRow
                  label="Registered"
                  value={new Date(patient.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
                <InfoRow
                  label="Last Updated"
                  value={new Date(patient.updatedAt).toLocaleDateString("en-US", {
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

export default PatientViewDetailDialog;