"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteSpeciality } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import SpecialityFormDialog from "@/components/modules/Admin/SpecialitiesManagement/SpecialityFormDialog";
import SpecialityViewDetailDialog from "@/components/modules/Admin/SpecialitiesManagement/SpecialityViewDetailDialog";
import { specialitiesColumns } from "@/components/modules/Admin/SpecialitiesManagement/specialitiesColumns";

interface ISpecialitiesTableProps {
  specialities: ISpecialty[];
}

const SpecialitiesTable = ({ specialities }: ISpecialitiesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingSpeciality, setDeletingSpeciality] = useState<ISpecialty | null>(null);
  const [viewingSpeciality, setViewingSpeciality] = useState<ISpecialty | null>(null);
  const [editingSpeciality, setEditingSpeciality] = useState<ISpecialty | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => router.refresh());
  };

  const confirmDelete = async () => {
    if (!deletingSpeciality) return;

    setIsDeleting(true);
    const result = await deleteSpeciality(deletingSpeciality.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message);
      setDeletingSpeciality(null);
      handleRefresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={specialities}
        columns={specialitiesColumns}
        onView={(speciality) => setViewingSpeciality(speciality)}
        onEdit={(speciality) => setEditingSpeciality(speciality)}
        onDelete={(speciality) => setDeletingSpeciality(speciality)}
        getRowKey={(speciality) => speciality.id}
        emptyMessage="No specialities found"
      />

      {/* Edit Dialog */}
      <SpecialityFormDialog
        open={!!editingSpeciality}
        onClose={() => setEditingSpeciality(null)}
        speciality={editingSpeciality}
        onSuccess={() => {
          setEditingSpeciality(null);
          handleRefresh();
        }}
      />

      {/* View Dialog */}
      <SpecialityViewDetailDialog
        open={!!viewingSpeciality}
        onClose={() => setViewingSpeciality(null)}
        speciality={viewingSpeciality}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationDialog
        open={!!deletingSpeciality}
        onOpenChange={(open) => !open && setDeletingSpeciality(null)}
        onConfirm={confirmDelete}
        title="Delete Speciality"
        description={`Are you sure you want to delete "${deletingSpeciality?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default SpecialitiesTable;