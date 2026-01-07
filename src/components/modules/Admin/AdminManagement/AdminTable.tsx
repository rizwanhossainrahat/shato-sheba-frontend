"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { softDeleteAdmin } from "@/services/admin/adminManagement";
import { IAdmin } from "@/types/admin.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import AdminFormDialog from "./AdminFormDialog";
import AdminViewDetailDialog from "./AdminViewDetailDialog";
import { adminColumns } from "./adminColumns";

interface IAdminTableProps {
  admins: IAdmin[];
}

const AdminTable = ({ admins }: IAdminTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingAdmin, setDeletingAdmin] = useState<IAdmin | null>(null);
  const [viewingAdmin, setViewingAdmin] = useState<IAdmin | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<IAdmin | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmDelete = async () => {
    if (!deletingAdmin) return;

    setIsDeleting(true);
    const result = await softDeleteAdmin(deletingAdmin.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message);
      setDeletingAdmin(null);
      handleRefresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={admins}
        columns={adminColumns}
        onView={(admin) => setViewingAdmin(admin)}
        onEdit={(admin) => setEditingAdmin(admin)}
        onDelete={(admin) => setDeletingAdmin(admin)}
        getRowKey={(admin) => admin.id!}
        emptyMessage="No admins found"
      />

      {/* Edit Dialog */}
      <AdminFormDialog
        open={!!editingAdmin}
        onClose={() => setEditingAdmin(null)}
        admin={editingAdmin!}
        onSuccess={() => {
          setEditingAdmin(null);
          handleRefresh();
        }}
      />

      {/* View Dialog */}
      <AdminViewDetailDialog
        open={!!viewingAdmin}
        onClose={() => setViewingAdmin(null)}
        admin={viewingAdmin}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeletingAdmin(null)}
        onConfirm={confirmDelete}
        title="Delete Admin"
        description={`Are you sure you want to delete ${deletingAdmin?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AdminTable;