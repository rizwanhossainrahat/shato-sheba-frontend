import { Column } from "@/components/shared/ManagementTable";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { DateCell } from "@/components/shared/cell/DateCell";
import { IAdmin } from "@/types/admin.interface";

export const adminColumns: Column<IAdmin>[] = [
    {
        header: "Admin",
        accessor: (admin) => (
            <UserInfoCell
                name={admin.name}
                email={admin.email}
                photo={typeof admin.profilePhoto === 'string' ? admin.profilePhoto : null}
            />
        ),
    },
    {
        header: "Contact",
        accessor: (admin) => (
            <span className="text-sm">{admin.contactNumber}</span>
        ),
    },
    {
        header: "Status",
        accessor: (admin) => <StatusBadgeCell isDeleted={admin.isDeleted} />,
    },
    {
        header: "Joined",
        accessor: (admin) => <DateCell date={admin.createdAt} />,
    },
];