"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UpdatePasswordSchema} from "@/utils/validators";
import {EditUserPasswordForm} from "@/types/user";
import useEditPassword from "@/app/account/me/_components/edit-account-password-form/hooks/useEditPassword";
import FieldWrapper from "@/components/inputs/field-wrapper";
import Input from "@/components/inputs/input";

const EditAccountPasswordForm = () => {
    const {
        handleSubmit,
        register,
        formState: {errors, touchedFields}
    } = useForm<EditUserPasswordForm>({
        resolver: zodResolver(UpdatePasswordSchema)
    });

    const {loading, editPassword} = useEditPassword();

    const onSubmit: SubmitHandler<EditUserPasswordForm> = async (payload: EditUserPasswordForm) => {
        await editPassword(payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FieldWrapper error={errors.password}>
                <Input id="password" name="password" label="Password attuale" register={{...register("password")}} touched={touchedFields["password"]}/>
            </FieldWrapper>
            <div className="flex flex-col md:flex-row gap-5 md:gap-0">
                <FieldWrapper error={errors.newPassword}>
                    <Input id="confirmPassword" name="confirmPassword" label="Nuova password" register={{...register("newPassword")}} touched={touchedFields["newPassword"]}/>
                </FieldWrapper>
                <FieldWrapper error={errors.repeatNewPassword}>
                    <Input id="repeatNewPassword" name="repeatNewPassword" label="Ripeti la nuova password" register={{...register("repeatNewPassword")}} touched={touchedFields["repeatNewPassword"]}/>
                </FieldWrapper>
            </div>
            <button type="submit" className="button--primary ml-auto" disabled={loading}>Cambia la password</button>
        </form>
    );
};

export default EditAccountPasswordForm;
