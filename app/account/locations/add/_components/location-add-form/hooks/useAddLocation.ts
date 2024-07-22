import LocationService from "@/services/location.service";
import {useState} from "react";
import toast from "react-hot-toast";
import {ValidationErrors} from "@/types/common";
import {useMutation} from "@tanstack/react-query";

const useAddLocation = () => {
    const [errors, setErrors] = useState<ValidationErrors>({});

    const {isPending, mutateAsync: addLocation} = useMutation({
        mutationFn: LocationService.add,
        onError: (e: any) => {
            setErrors(e.cause);
            toast.error(e.message || "Impossibile aggiungere la location");
        },
        throwOnError: true
    });

    return {
        isPending,
        errors,
        addLocation
    };
}

export default useAddLocation;
