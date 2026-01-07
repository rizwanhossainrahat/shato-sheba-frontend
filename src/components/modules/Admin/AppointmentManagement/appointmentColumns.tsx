import { Column } from "@/components/shared/ManagementTable";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { DateCell } from "@/components/shared/cell/DateCell";
import { IAppointment, AppointmentStatus, PaymentStatus } from "@/types/appointments.interface";
import { Badge } from "@/components/ui/badge";

const getStatusBadgeVariant = (status: AppointmentStatus) => {
    switch (status) {
        case AppointmentStatus.SCHEDULED:
            return "default";
        case AppointmentStatus.INPROGRESS:
            return "secondary";
        case AppointmentStatus.COMPLETED:
            return "outline";
        case AppointmentStatus.CANCELED:
            return "destructive";
        default:
            return "default";
    }
};

const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
        case AppointmentStatus.SCHEDULED:
            return "bg-blue-100 text-blue-800";
        case AppointmentStatus.INPROGRESS:
            return "bg-yellow-100 text-yellow-800";
        case AppointmentStatus.COMPLETED:
            return "bg-green-100 text-green-800";
        case AppointmentStatus.CANCELED:
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const appointmentColumns: Column<IAppointment>[] = [
    {
        header: "Patient",
        accessor: (appointment) => (
            <UserInfoCell
                name={appointment.patient?.name || "N/A"}
                email={appointment.patient?.email || "N/A"}
                photo={typeof appointment.patient?.profilePhoto === 'string' ? appointment.patient.profilePhoto : null}
            />
        ),
    },
    {
        header: "Doctor",
        accessor: (appointment) => (
            <UserInfoCell
                name={appointment.doctor?.name || "N/A"}
                email={appointment.doctor?.email || "N/A"}
                photo={typeof appointment.doctor?.profilePhoto === 'string' ? appointment.doctor.profilePhoto : null}
            />
        ),
    },
    {
        header: "Schedule",
        accessor: (appointment) => {
            if (!appointment.schedule || !appointment.schedule.startDateTime) return <span className="text-sm text-muted-foreground">N/A</span>;
            
            const startDate = new Date(appointment.schedule.startDateTime);
            return (
                <div className="text-sm">
                    <p className="font-medium">
                        {startDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
                    <p className="text-muted-foreground">
                        {startDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </p>
                </div>
            );
        },
    },
    {
        header: "Status",
        accessor: (appointment) => (
            <Badge className={getStatusColor(appointment.status)}>
                {appointment.status}
            </Badge>
        ),
    },
    {
        header: "Payment",
        accessor: (appointment) => (
            <Badge variant={appointment.paymentStatus === PaymentStatus.PAID ? "default" : "destructive"}>
                {appointment.paymentStatus}
            </Badge>
        ),
    },
    {
        header: "Created",
        accessor: (appointment) => <DateCell date={appointment.createdAt} />,
    },
];