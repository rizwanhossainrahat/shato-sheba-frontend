"use client";

const PatientManagementHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Management</h1>
        <p className="text-muted-foreground">
          Manage patient records and information
        </p>
      </div>
      {/* No Add button - patients register themselves */}
    </div>
  );
};

export default PatientManagementHeader;