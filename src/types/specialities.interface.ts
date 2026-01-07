export interface ISpecialty {
    id: string;
    title: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
}

export interface ISpecialtyFormData {
    title: string;
    icon?: File;
}