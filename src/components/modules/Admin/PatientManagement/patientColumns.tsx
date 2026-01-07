import { Column } from "@/components/shared/ManagementTable";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { DateCell } from "@/components/shared/cell/DateCell";
import { IPatient } from "@/types/patient.interface";

export const patientColumns: Column<IPatient>[] = [
    {
        header: "Patient",
        accessor: (patient) => (
            <UserInfoCell
                name={patient.name}
                email={patient.email}
                photo={typeof patient.profilePhoto === 'string' ? patient.profilePhoto : null}
            />
        ),
    },
    {
        header: "Contact",
        accessor: (patient) => (
            <span className="text-sm">{patient.contactNumber}</span>
        ),
    },
    {
        header: "Address",
        accessor: (patient) => (
            <span className="text-sm">{patient.address}</span>
        ),
    },
    {
        header: "Status",
        accessor: (patient) => <StatusBadgeCell isDeleted={patient.isDeleted} />,
    },
    {
        header: "Registered",
        accessor: (patient) => <DateCell date={patient.createdAt} />,
    },
];