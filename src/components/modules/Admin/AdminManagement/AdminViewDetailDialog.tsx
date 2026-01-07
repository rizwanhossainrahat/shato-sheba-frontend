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
import { IAdmin } from "@/types/admin.interface";
import { Mail, Phone, Shield, User } from "lucide-react";

interface IAdminViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  admin: IAdmin | null;
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

const AdminViewDetailDialog = ({
  open,
  onClose,
  admin,
}: IAdminViewDetailDialogProps) => {
  if (!admin) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Admin Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Header with Avatar */}
          <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={admin.profilePhoto || ""} />
              <AvatarFallback className="text-lg">
                {getInitials(admin.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-3xl font-bold">{admin.name}</h2>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" />
                {admin.email}
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant={admin.isDeleted ? "destructive" : "default"}>
                  {admin.isDeleted ? "Inactive" : "Active"}
                </Badge>
                <Badge variant="secondary">
                  <Shield className="h-3 w-3 mr-1" />
                  Administrator
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
                <InfoRow label="Full Name" value={admin.name} />
                <InfoRow label="Email Address" value={admin.email} />
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
                <InfoRow label="Contact Number" value={admin.contactNumber} />
              </div>
            </div>

            <Separator />

            {/* Account Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Account Information</h3>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow
                  label="Status"
                  value={
                    <Badge variant={admin.isDeleted ? "destructive" : "default"}>
                      {admin.isDeleted ? "Inactive" : "Active"}
                    </Badge>
                  }
                />
                <InfoRow
                  label="Created"
                  value={new Date(admin.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
                <InfoRow
                  label="Last Updated"
                  value={new Date(admin.updatedAt).toLocaleDateString("en-US", {
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

export default AdminViewDetailDialog;