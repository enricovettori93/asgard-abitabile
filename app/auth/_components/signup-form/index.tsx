"use client"

import FieldWrapper from "@/components/inputs/field-wrapper";
import {SubmitHandler, useForm} from "react-hook-form";
import {AddUserForm} from "@/types/user";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignupSchema} from "@/utils/validators";
import useSignUp from "@/app/auth/_components/signup-form/hooks/useSignUp";
import Input from "@/components/inputs/input";

interface props {
    handleSignUpFlow: Function
    onToggle: Function
}

export default function SignupForm({handleSignUpFlow, onToggle}: props) {
    const {signUp, isPending, errors: apiErrors} = useSignUp({handleSignUpFlow});
    const {
        register,
        handleSubmit,
        formState: {errors, touchedFields}
    } = useForm<AddUserForm & {confirmPassword: string}>({
        resolver: zodResolver(SignupSchema),
        errors: apiErrors
    });

    const onSubmit: SubmitHandler<AddUserForm & {confirmPassword: string}> = async (payload) => {
        signUp(payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <h2 className="text-2xl font-bold mb-5">Registra il tuo account</h2>
            <div className="flex flex-col flex-wrap md:flex-row gap-0 md:gap-5">
                <FieldWrapper error={errors.email}>
                    <Input id="email" name="email" label="Indirizzo email" type="email"
                           register={{...register("email")}} touched={touchedFields["email"]}/>
                </FieldWrapper>
                <FieldWrapper error={errors.profile}>
                    <Input id="profile" name="profile" label="Username" type="text" register={{...register("profile")}}
                           touched={touchedFields["profile"]}/>
                </FieldWrapper>
                <FieldWrapper error={errors.name}>
                    <Input id="name" name="name" label="Nome" type="text" register={{...register("name")}}
                           touched={touchedFields["name"]}/>
                </FieldWrapper>
                <FieldWrapper error={errors.surname}>
                    <Input id="surname" name="surname" label="Cognome" type="text" register={{...register("surname")}}
                           touched={touchedFields["surname"]}/>
                </FieldWrapper>
                <FieldWrapper error={errors.password}>
                    <Input id="password" name="password" label="Password" type="text"
                           register={{...register("password")}} touched={touchedFields["password"]}/>
                </FieldWrapper>
                <FieldWrapper error={errors.confirmPassword}>
                    <Input id="confirmPassword" name="confirmPassword" label="Conferma la password" type="text"
                           register={{...register("confirmPassword")}} touched={touchedFields["confirmPassword"]}/>
                </FieldWrapper>
            </div>
            <div className="flex ml-auto mt-5 gap-5">
                <button type="button" onClick={() => onToggle()} className="button--info">
                    Utente giá registrato?
                </button>
                <button type="submit" className="button--primary" disabled={isPending}>Sign up</button>
            </div>
        </form>
    )
}
