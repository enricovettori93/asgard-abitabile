"use client"

import {useState} from "react";
import SignupForm from "@/app/auth/_components/signup-form";
import SignInForm from "@/app/auth/_components/signin-form";

const ChooseAuthForm = () => {
    const [formType, setFormType] = useState<"signup" | "signin">("signin");

    const handleChangeForm = () => {
        setFormType(prev => prev === "signup" ? "signin" : "signup");
    }

    return (
        <div>
            {formType === "signup" ? <SignupForm handleSignUpFlow={handleChangeForm}/> : <SignInForm/>}
            <button onClick={handleChangeForm}
                    className="button--primary mt-10">{formType === "signup" ? "Utente giá registrato?" : "Utente da registrare?"}</button>
        </div>
    )
}

export default ChooseAuthForm;
