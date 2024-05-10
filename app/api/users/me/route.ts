import {NextRequest, NextResponse} from "next/server";
import UserRepository from "@/repositories/user.repository";
import {ResponseDTO} from "@/types/common";
import {SafeUser} from "@/types/user";
import {getUserIdFromRequest} from "@/utils/session";
import {EditAccountSchema} from "@/utils/validators";
import {transformValidationErrors} from "@/utils/functions";

export async function GET(request: NextRequest) {
    const userId = await getUserIdFromRequest();

    const user = await UserRepository.findById(`${userId}`);

    if (!user) {
        return NextResponse.json({
            message: "User not found"
        } satisfies ResponseDTO<never>, {
            status: 404
        });
    }

    return NextResponse.json({
        data: user
    } satisfies ResponseDTO<SafeUser>);
}

export async function PATCH(request: NextRequest) {
    const userId = await getUserIdFromRequest();
    const body = await request.json();

    const validationResult = EditAccountSchema.safeParse(body);

    if (!validationResult.success) {
        return NextResponse.json({
            errors: transformValidationErrors(validationResult)
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    try {
        const user = await UserRepository.update(userId, body);
        return NextResponse.json({
            data: user
        } satisfies ResponseDTO<SafeUser>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message,
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }
}
