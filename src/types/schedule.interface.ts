export interface ISchedule {
    id: string;
    // Backend might return either format
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    // Or it might return datetime fields
    startDateTime?: string;
    endDateTime?: string;
    createdAt: string;
    updatedAt: string;
}

export interface IScheduleFormData {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}

export interface IDoctorSchedule {
    scheduleId: string;
    doctorId: string;
    isBooked: boolean;
    appointmentId?: string;
    createdAt: string;
    updatedAt: string;
    schedule?: ISchedule;
}

