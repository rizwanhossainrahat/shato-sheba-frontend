"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ISpecialty } from "@/types/specialities.interface";
import { Calendar, FileText, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ISpecialityViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  speciality: ISpecialty | null;
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

const SpecialityViewDetailDialog = ({
  open,
  onClose,
  speciality,
}: ISpecialityViewDetailDialogProps) => {
  if (!speciality) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Speciality Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Header with Icon */}
          <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-6">
            <div className="h-20 w-20 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
              <Image
                src={speciality.icon}
                alt={speciality.title}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold">{speciality.title}</h2>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">
                  <FileText className="h-3 w-3 mr-1" />
                  Medical Speciality
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Basic Information</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow label="Title" value={speciality.title} />
                <InfoRow label="ID" value={speciality.id} />
              </div>
            </div>

            <Separator />

            {/* Icon Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">Icon</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src={speciality.icon}
                    alt={speciality.title}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover border"
                  />
                  <div>
                    <p className="text-sm font-medium">Icon Preview</p>
                    <p className="text-xs text-muted-foreground">
                      This icon represents the {speciality.title} speciality
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Timestamps</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow
                  label="Created"
                  value={new Date(speciality.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
                <InfoRow
                  label="Last Updated"
                  value={new Date(speciality.updatedAt).toLocaleDateString("en-US", {
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

export default SpecialityViewDetailDialog;