"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { IAppointment } from "@/types/appointments.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import AppointmentStatusDialog from "./AppointmentStatusDialog";
import AppointmentViewDetailDialog from "./AppointmentViewDetailDialog";
import { appointmentColumns } from "./appointmentColumns";

interface IAppointmentTableProps {
  appointments: IAppointment[];
}

const AppointmentTable = ({ appointments }: IAppointmentTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [viewingAppointment, setViewingAppointment] = useState<IAppointment | null>(null);
  const [editingAppointment, setEditingAppointment] = useState<IAppointment | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <ManagementTable
        data={appointments}
        columns={appointmentColumns}
        onView={(appointment) => setViewingAppointment(appointment)}
        onEdit={(appointment) => setEditingAppointment(appointment)}
        getRowKey={(appointment) => appointment.id}
        emptyMessage="No appointments found"
      />

      {/* View Dialog */}
      <AppointmentViewDetailDialog
        open={!!viewingAppointment}
        onClose={() => setViewingAppointment(null)}
        appointment={viewingAppointment}
      />

      {/* Status Update Dialog */}
      {editingAppointment && (
        <AppointmentStatusDialog
          open={!!editingAppointment}
          onClose={() => setEditingAppointment(null)}
          appointment={editingAppointment}
          onSuccess={() => {
            setEditingAppointment(null);
            handleRefresh();
          }}
        />
      )}
    </>
  );
};

export default AppointmentTable;