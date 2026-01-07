import SpecialitiesManagementHeader from "@/components/modules/Admin/SpecialitiesManagement/SpecialitiesManagementHeader";
import SpecialitiesTable from "@/components/modules/Admin/SpecialitiesManagement/SpecialitiesTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { Suspense } from "react";

const AdminSpecialitiesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const specialitiesResult = await getSpecialities(queryString);

  const totalPages = Math.ceil(
    (specialitiesResult?.meta?.total || 1) / (specialitiesResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <SpecialitiesManagementHeader />

      {/* Search and Filters */}
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search specialities..." />
        <RefreshButton />
      </div>

      <Suspense fallback={<TableSkeleton columns={3} rows={10} />}>
        <SpecialitiesTable specialities={specialitiesResult?.data || []} />
        <TablePagination
          currentPage={specialitiesResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminSpecialitiesManagementPage;