import { IDoctor } from "@/types/doctor.interface";
import { ISpecialty } from "@/types/specialities.interface";
import { useEffect, useState } from "react";

interface UseSpecialtySelectionProps {
    doctor?: IDoctor;
    isEdit: boolean;
    open: boolean;
}

interface UseSpecialtySelectionReturn {
    selectedSpecialtyIds: string[];
    removedSpecialtyIds: string[];
    currentSpecialtyId: string;
    setCurrentSpecialtyId: (id: string) => void;
    handleAddSpecialty: () => void;
    handleRemoveSpecialty: (id: string) => void;
    getNewSpecialties: () => string[];
    getAvailableSpecialties: (allSpecialties: ISpecialty[]) => ISpecialty[];
}


export const useSpecialtySelection = ({
    doctor,
    isEdit,
    open,
}: UseSpecialtySelectionProps): UseSpecialtySelectionReturn => {

    const getInitialSpecialtyIds = () => {
        if (isEdit && doctor?.doctorSpecialties) {
            return (
                doctor?.doctorSpecialties
                    ?.map((ds) => {
                        // Try: specialitiesId, specialities.id, or specialties.id
                        return (
                            ds?.specialitiesId || null
                        );
                    })
                    ?.filter((id): id is string => !!id) || []
            );
        }
        return [];
    };


    const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<string[]>(
        getInitialSpecialtyIds
    );

    const [removedSpecialtyIds, setRemovedSpecialtyIds] = useState<string[]>([]);
    const [currentSpecialtyId, setCurrentSpecialtyId] = useState<string>("");


    const handleAddSpecialty = () => {
        console.log("handleAddSpecialty called, currentSpecialtyId:", currentSpecialtyId);
        if (
            currentSpecialtyId &&
            !selectedSpecialtyIds.includes(currentSpecialtyId)
        ) {
            const newSelectedIds = [...selectedSpecialtyIds, currentSpecialtyId];
            console.log("Adding specialty, new selectedSpecialtyIds:", newSelectedIds);
            setSelectedSpecialtyIds(newSelectedIds);
            // If in edit mode and we're re-adding a removed specialty
            if (removedSpecialtyIds.includes(currentSpecialtyId)) {
                setRemovedSpecialtyIds(
                    removedSpecialtyIds.filter((id) => id !== currentSpecialtyId)
                );
            }
            setCurrentSpecialtyId("");
        }
    };

    const handleRemoveSpecialty = (specialtyId: string) => {
        setSelectedSpecialtyIds(
            selectedSpecialtyIds.filter((id) => id !== specialtyId)
        );

        // In edit mode, track removed specialties
        if (isEdit && doctor?.doctorSpecialties) {
            const wasOriginalSpecialty = doctor?.doctorSpecialties?.some((ds) => {
                const id =
                    ds?.specialitiesId || null
                return id === specialtyId;
            });
            if (wasOriginalSpecialty && !removedSpecialtyIds.includes(specialtyId)) {
                setRemovedSpecialtyIds([...removedSpecialtyIds, specialtyId]);
            }
        }
    };

    const getNewSpecialties = (): string[] => {
        if (!isEdit || !doctor?.doctorSpecialties) {
            return selectedSpecialtyIds;
        }
        const originalIds =
            doctor?.doctorSpecialties
                ?.map(
                    (ds) => ds?.specialitiesId || null
                )
                ?.filter((id): id is string => !!id) || [];
        return selectedSpecialtyIds.filter((id) => !originalIds.includes(id));
    };

    const getAvailableSpecialties = (allSpecialties: ISpecialty[]) => {
        return allSpecialties?.filter((s) => !selectedSpecialtyIds?.includes(s?.id)) || [];
    };

    // Reset state when dialog opens/closes
    useEffect(() => {
        if (open) {
            if (isEdit && doctor) {
                // Edit mode: load existing specialties
                const initialIds = getInitialSpecialtyIds();
                setSelectedSpecialtyIds(initialIds);
                setRemovedSpecialtyIds([]);
            } else {
                // Create mode: start with empty array
                setSelectedSpecialtyIds([]);
                setRemovedSpecialtyIds([]);
            }
            setCurrentSpecialtyId("");
        } else {
            // Dialog closed - reset everything
            setSelectedSpecialtyIds([]);
            setRemovedSpecialtyIds([]);
            setCurrentSpecialtyId("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, isEdit, doctor?.id]);


    return {
        selectedSpecialtyIds,
        removedSpecialtyIds,
        currentSpecialtyId,
        setCurrentSpecialtyId,
        handleAddSpecialty,
        handleRemoveSpecialty,
        getNewSpecialties,
        getAvailableSpecialties,
    };
};