"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UpdatePasswordSchema} from "@/utils/validators";
import {EditUserPasswordForm} from "@/types/user";
import useEditPassword from "@/app/account/me/_components/edit-account-password-form/hooks/useEditPassword";
import FieldWrapper from "@/components/inputs/field-wrapper";

const EditAccountPasswordForm = () => {
    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<EditUserPasswordForm>({
        resolver: zodResolver(UpdatePasswordSchema)
    });

    const {loading, editPassword} = useEditPassword();

    const onSubmit: SubmitHandler<EditUserPasswordForm> = async (payload: EditUserPasswordForm) => {
        await editPassword(payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
                <FieldWrapper error={errors.password}>
                    <label htmlFor="password">Password attuale</label>
                    <input id="password" type="password" {...register("password")}/>
                </FieldWrapper>
                <FieldWrapper error={errors.newPassword}>
                    <label htmlFor="confirmPassword">Nuova password</label>
                    <input id="confirmPassword" type="password" {...register("newPassword")}/>
                </FieldWrapper>
                <FieldWrapper error={errors.repeatNewPassword}>
                    <label htmlFor="repeatNewPassword">Ripeti la nuova password</label>
                    <input id="repeatNewPassword" type="password" {...register("repeatNewPassword")}/>
                </FieldWrapper>
            </div>
            <button type="submit" className="button--primary" disabled={loading}>Cambia la password</button>
        </form>
    );
};

export default EditAccountPasswordForm;
