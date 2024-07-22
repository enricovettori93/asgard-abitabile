"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {EditAccountSchema} from "@/utils/validators";
import useEditAccountDetail from "@/app/account/me/_components/edit-account-detail-form/hooks/useEditAccountDetail";
import {EditUserForm} from "@/types/user";
import FieldWrapper from "@/components/inputs/field-wrapper";
import {useContext} from "react";
import {UserContext} from "@/context/user.context";
import Input from "@/components/inputs/input";

const EditAccountDetailForm = () => {
    const {user} = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: {errors, touchedFields}
    } = useForm<EditUserForm>({
        values: {
            name: user?.name ?? "",
            surname: user?.surname ?? ""
        },
        resolver: zodResolver(EditAccountSchema)
    });

    const {isPending, editAccount} = useEditAccountDetail();

    const onSubmit: SubmitHandler<EditUserForm> = async (payload) => {
        editAccount(payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
                <FieldWrapper>
                    <Input id="email" name="email" label="Email (non modificabile)" value={user?.email ?? ""} touched={true} disabled/>
                </FieldWrapper>
                <FieldWrapper>
                    <Input id="profile" name="profile" label="Username (non modificabile)" value={user?.profile ?? ""} touched={true} disabled/>
                </FieldWrapper>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <FieldWrapper error={errors.name}>
                    <Input id="name" name="name" label="Nome" type="text" register={{...register("name")}} touched={touchedFields["name"]}/>
                </FieldWrapper>
                <FieldWrapper error={errors.surname}>
                    <Input id="surname" name="surname" label="Cognome" type="text" register={{...register("surname")}} touched={touchedFields["surname"]}/>
                </FieldWrapper>
            </div>
            <button type="submit" className="button--primary ml-auto" disabled={isPending}>Aggiorna le informazioni</button>
        </form>
    );
};

export default EditAccountDetailForm;
