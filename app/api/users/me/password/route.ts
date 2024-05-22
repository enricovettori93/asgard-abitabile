import {EditUserPasswordForm} from "@/types/user";
import {NextRequest, NextResponse} from "next/server";
import {UpdatePasswordSchema} from "@/utils/validators";
import {transformValidationErrors} from "@/utils/functions";
import {ResponseDTO} from "@/types/common";
import {getUserIdFromRequest} from "@/utils/session";
import UserRepository from "@/repositories/user.repository";

export async function PATCH(request: NextRequest) {
    const body: EditUserPasswordForm = await request.json();
    const userId = await getUserIdFromRequest();

    const validationResult = UpdatePasswordSchema.safeParse(body);

    if (!validationResult.success) {
        return NextResponse.json({
            errors: transformValidationErrors(validationResult)
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    try {
        await UserRepository.updatePassword(userId, body);

        return NextResponse.json({
            message: "Password updated correctly"
        } satisfies ResponseDTO<never>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
