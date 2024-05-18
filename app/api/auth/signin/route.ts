import {NextRequest, NextResponse} from "next/server";
import {SignInSchema} from "@/utils/validators";
import {transformValidationErrors} from "@/utils/functions";
import {ResponseDTO} from "@/types/common";
import UserRepository from "@/repositories/user.repository";
import {SafeUser} from "@/types/user";
import {createSession} from "@/utils/session";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validationResult = SignInSchema.safeParse(body);

    if (!validationResult.success) {
        return NextResponse.json({
            errors: transformValidationErrors(validationResult)
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    try {
        const user = await UserRepository.login(body);

        await createSession(user.id);

        return NextResponse.json({
            data: user
        } satisfies ResponseDTO<SafeUser>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
