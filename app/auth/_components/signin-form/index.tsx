"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import FieldWrapper from "@/components/inputs/field-wrapper";
import {UserSignInForm} from "@/types/user";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignInSchema} from "@/utils/validators";
import useSignIn from "@/app/auth/_components/signin-form/hooks/useSignIn";
import Input from "@/components/inputs/input";

export default function SignInForm() {
    const {loading, signIn, errors: apiErrors} = useSignIn();

    const {
        handleSubmit,
        register,
        formState: {errors, touchedFields}
    } = useForm<UserSignInForm>({
        resolver: zodResolver(SignInSchema),
        errors: apiErrors
    });

    const onSubmit: SubmitHandler<UserSignInForm> = async (payload) => {
        await signIn(payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex gap-5">
                <FieldWrapper error={errors.email}>
                    <Input id="email" name="email" label="Email" type="email" register={{...register("email")}} touched={touchedFields["email"]}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.password}>
                    <Input id="password" name="password" label="Password" type="password" register={{...register("password")}} touched={touchedFields["password"]}/>
                </FieldWrapper>
            </div>
            <button type="submit" className="button--primary" disabled={loading}>Login</button>
        </form>
    )
}
