"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {EditAccountSchema} from "@/utils/validators";
import useEditAccountDetail from "@/app/account/me/_components/edit-account-detail-form/hooks";
import {EditUserForm} from "@/types/user";
import FieldWrapper from "@/components/inputs/field-wrapper";
import {useContext} from "react";
import {UserContext} from "@/context/user.context";

const EditAccountDetailForm = () => {
    const {user} = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<EditUserForm>({
        values: {
            name: user?.name ?? "",
            surname: user?.surname ?? ""
        },
        resolver: zodResolver(EditAccountSchema)
    });

    const {loading, editAccount} = useEditAccountDetail();

    const onSubmit: SubmitHandler<EditUserForm> = async (payload) => {
        await editAccount(payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
                <FieldWrapper>
                    <label htmlFor="email">Email (non modificabile)</label>
                    <input id="email" type="email" disabled value={user?.email ?? ""}/>
                </FieldWrapper>
                <FieldWrapper>
                    <label htmlFor="profile">Username (non modificabile)</label>
                    <input id="profile" type="text" disabled value={user?.profile ?? ""}/>
                </FieldWrapper>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <FieldWrapper error={errors.name}>
                    <label htmlFor="name">Nome</label>
                    <input id="name" type="text" {...register("name")}/>
                </FieldWrapper>
                <FieldWrapper error={errors.surname}>
                    <label htmlFor="surname">Cognome</label>
                    <input id="surname" type="text" {...register("surname")}/>
                </FieldWrapper>
            </div>
            <button type="submit" className="button--primary ml-auto" disabled={loading}>Aggiorna le informazioni</button>
        </form>
    );
};

export default EditAccountDetailForm;
