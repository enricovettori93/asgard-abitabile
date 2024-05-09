import {NextRequest, NextResponse} from "next/server";
import {SignupSchema} from "@/utils/validators";
import {ResponseDTO} from "@/types/common";
import UserRepository from "@/repositories/user.repository";
import {transformValidationErrors} from "@/utils/functions";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validationResult = SignupSchema.safeParse(body);

    if (!validationResult.success) {
        return NextResponse.json({
            errors: transformValidationErrors(validationResult)
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    const {confirmPassword, ...payload} = body;

    await UserRepository.register(payload);

    return NextResponse.json({
        message: "User created"
    } satisfies ResponseDTO<never>);
}
