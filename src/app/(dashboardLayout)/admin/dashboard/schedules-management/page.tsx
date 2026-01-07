import ScheduleManagementHeader from "@/components/modules/Admin/ScheduleManagement/ScheduleManagementHeader";
import ScheduleTable from "@/components/modules/Admin/ScheduleManagement/ScheduleTable";
import RefreshButton from "@/components/shared/RefreshButton";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getSchedules } from "@/services/admin/scheduleManagement";
import { Suspense } from "react";

const AdminSchedulesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const schedulesResult = await getSchedules(queryString);

  const totalPages = Math.ceil(
    (schedulesResult?.meta?.total || 1) / (schedulesResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ScheduleManagementHeader />

      {/* Filters */}
      <div className="flex space-x-2">
        <RefreshButton />
      </div>

      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <ScheduleTable schedules={schedulesResult?.data || []} />
        <TablePagination
          currentPage={schedulesResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminSchedulesManagementPage;
