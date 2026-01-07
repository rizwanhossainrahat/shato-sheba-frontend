"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteSchedule } from "@/services/admin/scheduleManagement";
import { ISchedule } from "@/types/schedule.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ScheduleViewDetailDialog from "./ScheduleViewDetailDialog";
import { scheduleColumns } from "./scheduleColumns";

interface IScheduleTableProps {
  schedules: ISchedule[];
}

const ScheduleTable = ({ schedules }: IScheduleTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingSchedule, setDeletingSchedule] = useState<ISchedule | null>(null);
  const [viewingSchedule, setViewingSchedule] = useState<ISchedule | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmDelete = async () => {
    if (!deletingSchedule) return;

    setIsDeleting(true);
    const result = await deleteSchedule(deletingSchedule.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message);
      setDeletingSchedule(null);
      handleRefresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={schedules}
        columns={scheduleColumns}
        onView={(schedule) => setViewingSchedule(schedule)}
        onDelete={(schedule) => setDeletingSchedule(schedule)}
        getRowKey={(schedule) => schedule.id}
        emptyMessage="No schedules found"
      />

      {/* View Dialog */}
      <ScheduleViewDetailDialog
        open={!!viewingSchedule}
        onClose={() => setViewingSchedule(null)}
        schedule={viewingSchedule}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationDialog
        open={!!deletingSchedule}
        onOpenChange={(open) => !open && setDeletingSchedule(null)}
        onConfirm={confirmDelete}
        title="Delete Schedule"
        description="Are you sure you want to delete this schedule? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ScheduleTable;