import AppointmentManagementHeader from "@/components/modules/Admin/AppointmentManagement/AppointmentManagementHeader";
import AppointmentTable from "@/components/modules/Admin/AppointmentManagement/AppointmentTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAppointments } from "@/services/admin/appointmentManagement";
import { Suspense } from "react";

const AppointmentsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const response = await getAppointments(queryString);

  const totalPages = Math.ceil(
    (response?.meta?.total || 1) / (response?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <AppointmentManagementHeader />

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search appointments..." />
        <SelectFilter
          paramName="status"
          placeholder="Filter by status"
          options={[
            { label: "Scheduled", value: "SCHEDULED" },
            { label: "In Progress", value: "INPROGRESS" },
            { label: "Completed", value: "COMPLETED" },
            { label: "Canceled", value: "CANCELED" },
          ]}
        />
        <SelectFilter
          paramName="paymentStatus"
          placeholder="Payment status"
          options={[
            { label: "Paid", value: "PAID" },
            { label: "Unpaid", value: "UNPAID" },
          ]}
        />
        <RefreshButton />
      </div>

      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <AppointmentTable appointments={response?.data || []} />
        <TablePagination
          currentPage={response?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AppointmentsManagementPage;
