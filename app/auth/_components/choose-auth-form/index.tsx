"use client"

import {Suspense, useState} from "react";
import SignupForm from "@/app/auth/_components/signup-form";
import SignInForm from "@/app/auth/_components/signin-form";
import classNames from "classnames";
import Card from "@/components/card";

const ChooseAuthForm = () => {
    const [formType, setFormType] = useState<"signup" | "signin">("signin");

    const handleChangeForm = () => {
        setFormType(prev => prev === "signup" ? "signin" : "signup");
    }

    const commonStyle = "w-full absolute transition-all duration-500";

    const signUpCardStyle = classNames({
        [commonStyle]: true,
        "scale-50 opacity-0 invisible": formType === "signin",
        "scale-100 opacity-100 visible": formType !== "signin",
    });

    const signInCardStyle = classNames({
        [commonStyle]: true,
        "scale-150 opacity-0 invisible": formType === "signup",
        "scale-100 opacity-100 visible": formType !== "signup",
    });

    return (
        <>
            <Card className={signUpCardStyle}>
                <SignupForm onToggle={handleChangeForm} handleSignUpFlow={handleChangeForm}/>
            </Card>
            <Suspense>
                <Card className={signInCardStyle}>
                    <SignInForm onToggle={handleChangeForm}/>
                </Card>
            </Suspense>
        </>
    )
}

export default ChooseAuthForm;
