import { Column } from "@/components/shared/ManagementTable";
import { DateCell } from "@/components/shared/cell/DateCell";
import { ISchedule } from "@/types/schedule.interface";
import { Badge } from "@/components/ui/badge";

// Utility functions to safely extract date/time from either format
const getStartDate = (schedule: ISchedule): string => {
    if (schedule.startDate) return schedule.startDate;
    if (schedule.startDateTime) return schedule.startDateTime.split('T')[0];
    return '';
};

const getEndDate = (schedule: ISchedule): string => {
    if (schedule.endDate) return schedule.endDate;
    if (schedule.endDateTime) return schedule.endDateTime.split('T')[0];
    return '';
};

const getStartTime = (schedule: ISchedule): string => {
    if (schedule.startTime) return schedule.startTime;
    if (schedule.startDateTime) {
        const date = new Date(schedule.startDateTime);
        return date.toTimeString().slice(0, 5); // HH:MM format
    }
    return '';
};

const getEndTime = (schedule: ISchedule): string => {
    if (schedule.endTime) return schedule.endTime;
    if (schedule.endDateTime) {
        const date = new Date(schedule.endDateTime);
        return date.toTimeString().slice(0, 5); // HH:MM format
    }
    return '';
};

const formatDisplayDate = (dateStr: string): string => {
    if (!dateStr) return 'N/A';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return 'N/A';
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return 'N/A';
    }
};

export const scheduleColumns: Column<ISchedule>[] = [
    {
        header: "Start Date",
        accessor: (schedule) => (
            <span className="text-sm font-medium">
                {formatDisplayDate(getStartDate(schedule))}
            </span>
        ),
    },
    {
        header: "End Date",
        accessor: (schedule) => (
            <span className="text-sm font-medium">
                {formatDisplayDate(getEndDate(schedule))}
            </span>
        ),
    },
    {
        header: "Start Time",
        accessor: (schedule) => (
            <Badge variant="outline">
                {getStartTime(schedule) || "N/A"}
            </Badge>
        ),
    },
    {
        header: "End Time",
        accessor: (schedule) => (
            <Badge variant="outline">
                {getEndTime(schedule) || "N/A"}
            </Badge>
        ),
    },
    {
        header: "Duration",
        accessor: (schedule) => {
            const startTime = getStartTime(schedule);
            const endTime = getEndTime(schedule);

            // Safety check for time fields
            if (!startTime || !endTime) {
                return <span className="text-sm text-muted-foreground">N/A</span>;
            }

            try {
                // Parse time strings (HH:MM format)
                const [startHour, startMin] = startTime.split(':').map(Number);
                const [endHour, endMin] = endTime.split(':').map(Number);
                
                const startMinutes = startHour * 60 + startMin;
                const endMinutes = endHour * 60 + endMin;
                const diffMinutes = endMinutes - startMinutes;
                
                const hours = Math.floor(diffMinutes / 60);
                const minutes = diffMinutes % 60;
                
                return (
                    <span className="text-sm text-muted-foreground">
                        {hours > 0 && `${hours}h `}
                        {minutes > 0 && `${minutes}m`}
                        {hours === 0 && minutes === 0 && "0m"}
                    </span>
                );
            } catch (error) {
                return <span className="text-sm text-muted-foreground">N/A</span>;
            }
        },
    },
    {
        header: "Created",
        accessor: (schedule) => <DateCell date={schedule.createdAt} />,
    },
];