"use client"

import FieldWrapper from "@/components/inputs/field-wrapper";
import {SubmitHandler, useForm} from "react-hook-form";
import {AddUserForm} from "@/types/user";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignupSchema} from "@/utils/validators";
import useSignUp from "@/components/signup-form/hooks/useSignUp";

export default function SignupForm() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<AddUserForm & {confirmPassword: string}>({
        resolver: zodResolver(SignupSchema)
    });

    const {signUp, loading} = useSignUp();

    const onSubmit: SubmitHandler<AddUserForm & {confirmPassword: string}> = async (payload) => {
        await signUp(payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex gap-5">
                <FieldWrapper error={errors.email}>
                    <label htmlFor="email">Indirizzo email</label>
                    <input type="email" {...register("email")}/>
                </FieldWrapper>
                <FieldWrapper error={errors.profile}>
                    <label htmlFor="profile">Username</label>
                    <input type="text" {...register("profile")}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.name}>
                    <label htmlFor="name">Nome</label>
                    <input type="name" {...register("name")}/>
                </FieldWrapper>
                <FieldWrapper error={errors.surname}>
                    <label htmlFor="surname">Cognome</label>
                    <input type="surname" {...register("surname")}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.password}>
                    <label htmlFor="password">Password</label>
                    <input type="text" {...register("password")}/>
                </FieldWrapper>
                <FieldWrapper error={errors.confirmPassword}>
                    <label htmlFor="confirmPassword">Conferma la password</label>
                    <input type="text" {...register("confirmPassword")}/>
                </FieldWrapper>
            </div>
            <button type="submit" className="button--primary" disabled={loading}>Sign up</button>
        </form>
    )
}
