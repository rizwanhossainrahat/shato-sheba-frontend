import PatientManagementHeader from "@/components/modules/Admin/PatientManagement/PatientManagementHeader";
import PatientTable from "@/components/modules/Admin/PatientManagement/PatientTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getPatients } from "@/services/admin/patientManagement";
import { Suspense } from "react";

const AdminPatientsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const patientsResult = await getPatients(queryString);



  const totalPages = Math.ceil(
    (patientsResult?.meta?.total || 1) / (patientsResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <PatientManagementHeader />

      {/* Search and Filters */}
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search patients..." />
        <SelectFilter
          paramName="isDeleted"
          placeholder="Filter by status"
          options={[
            { label: "Active", value: "false" },
            { label: "Deleted", value: "true" },
          ]}
        />
        <RefreshButton />
      </div>



      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <PatientTable patients={patientsResult?.data || patientsResult?.patients || []} />
        <TablePagination
          currentPage={patientsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminPatientsManagementPage;
