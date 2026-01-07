"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { softDeletePatient } from "@/services/admin/patientManagement";
import { IPatient } from "@/types/patient.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import PatientFormDialog from "./PatientFormDialog";
import PatientViewDetailDialog from "./PatientViewDetailDialog";
import { patientColumns } from "./patientColumns";

interface IPatientTableProps {
  patients: IPatient[];
}

const PatientTable = ({ patients }: IPatientTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingPatient, setDeletingPatient] = useState<IPatient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<IPatient | null>(null);
  const [editingPatient, setEditingPatient] = useState<IPatient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmDelete = async () => {
    if (!deletingPatient) return;

    setIsDeleting(true);
    const result = await softDeletePatient(deletingPatient.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message);
      setDeletingPatient(null);
      handleRefresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={patients}
        columns={patientColumns}
        onView={(patient) => setViewingPatient(patient)}
        onEdit={(patient) => setEditingPatient(patient)}
        onDelete={(patient) => setDeletingPatient(patient)}
        getRowKey={(patient) => patient.id!}
        emptyMessage="No patients found"
      />

      {/* Edit Dialog */}
      {editingPatient && (
        <PatientFormDialog
          open={!!editingPatient}
          onClose={() => setEditingPatient(null)}
          patient={editingPatient}
          onSuccess={() => {
            setEditingPatient(null);
            handleRefresh();
          }}
        />
      )}

      {/* View Dialog */}
      <PatientViewDetailDialog
        open={!!viewingPatient}
        onClose={() => setViewingPatient(null)}
        patient={viewingPatient}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationDialog
        open={!!deletingPatient}
        onOpenChange={(open) => !open && setDeletingPatient(null)}
        onConfirm={confirmDelete}
        title="Delete Patient"
        description={`Are you sure you want to delete ${deletingPatient?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default PatientTable;