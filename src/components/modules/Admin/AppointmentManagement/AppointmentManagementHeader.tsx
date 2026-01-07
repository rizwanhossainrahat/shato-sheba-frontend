"use client";

const AppointmentManagementHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointment Management</h1>
        <p className="text-muted-foreground">
          View and manage patient appointments
        </p>
      </div>
      {/* No Add button - appointments are created by patients */}
    </div>
  );
};

export default AppointmentManagementHeader;