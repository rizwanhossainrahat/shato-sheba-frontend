"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { useState } from "react";
import SpecialityFormDialog from "@/components/modules/Admin/SpecialitiesManagement/SpecialityFormDialog";

interface ISpecialitiesManagementHeaderProps {
  onSuccess?: () => void;
}

const SpecialitiesManagementHeader = ({
  onSuccess,
}: ISpecialitiesManagementHeaderProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleSuccess = () => {
    setIsCreateDialogOpen(false);
    onSuccess?.();
  };

  return (
    <>
      <ManagementPageHeader
        title="Specialities Management"
        description="Manage medical specialities and their icons"
        action={{
          label: "Add Speciality",
          onClick: () => setIsCreateDialogOpen(true),
        }}
      />

      <SpecialityFormDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default SpecialitiesManagementHeader;