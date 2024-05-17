"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import FieldWrapper from "@/components/inputs/field-wrapper";
import {UserSignInForm} from "@/types/user";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignInSchema} from "@/utils/validators";
import useSignIn from "@/app/auth/_components/signin-form/hooks/useSignIn";

export default function SignInForm() {
    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<UserSignInForm>({
        resolver: zodResolver(SignInSchema)
    });

    const {loading, signIn} = useSignIn();

    const onSubmit: SubmitHandler<UserSignInForm> = async (payload) => {
        await signIn(payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex gap-5">
                <FieldWrapper error={errors.email}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" {...register("email")}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.password}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" {...register("password")}/>
                </FieldWrapper>
            </div>
            <button type="submit" className="button--primary" disabled={loading}>Login</button>
        </form>
    )
}
