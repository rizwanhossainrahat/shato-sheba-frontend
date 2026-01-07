import { Column } from "@/components/shared/ManagementTable";
import { DateCell } from "@/components/shared/cell/DateCell";
import { ISpecialty } from "@/types/specialities.interface";
import Image from "next/image";

export const specialitiesColumns: Column<ISpecialty>[] = [
    {
        header: "Icon",
        accessor: (speciality) => (
            <div className="flex items-center justify-center">
                <Image
                    src={speciality.icon}
                    alt={speciality.title}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />
            </div>
        ),
    },
    {
        header: "Title",
        accessor: (speciality) => (
            <span className="font-medium">{speciality.title}</span>
        ),
    },
    {
        header: "Created",
        accessor: (speciality) => <DateCell date={speciality.createdAt} />,
    },
];