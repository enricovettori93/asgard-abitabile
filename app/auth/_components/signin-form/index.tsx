"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import FieldWrapper from "@/components/inputs/field-wrapper";
import {UserSignInForm} from "@/types/user";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignInSchema} from "@/utils/validators";
import useSignIn from "@/app/auth/_components/signin-form/hooks/useSignIn";
import Input from "@/components/inputs/input";

export default function SignInForm({onToggle}: {onToggle: Function}) {
    const {isPending, signIn, errors: apiErrors} = useSignIn();

    const {
        handleSubmit,
        register,
        formState: {errors, touchedFields}
    } = useForm<UserSignInForm>({
        resolver: zodResolver(SignInSchema),
        errors: apiErrors
    });

    const onSubmit: SubmitHandler<UserSignInForm> = async (payload) => {
        signIn(payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <h2 className="text-2xl font-bold mb-5">Accedi con il tuo account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <FieldWrapper error={errors.email}>
                    <Input id="email" name="email" label="Email" type="email" register={{...register("email")}}
                           touched={touchedFields["email"]}/>
                </FieldWrapper>
                <FieldWrapper error={errors.password}>
                    <Input id="password" name="password" label="Password" type="password"
                           register={{...register("password")}} touched={touchedFields["password"]}/>
                </FieldWrapper>
            </div>
            <div className="flex ml-auto mt-5 gap-5">
                <button type="button" onClick={() => onToggle()} className="button--info">
                    Utente da registrare?
                </button>
                <button type="submit" className="button--primary" disabled={isPending}>Login</button>
            </div>
        </form>
    )
}
