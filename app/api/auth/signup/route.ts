import {NextRequest, NextResponse} from "next/server";
import {SignupSchema} from "@/utils/validators";
import {ResponseDTO} from "@/types/common";
import UserRepository from "@/repositories/user.repository";
import {User} from "@prisma/client";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validationResult = SignupSchema.safeParse(body);

    if (!validationResult.success) {
        const errors = Object.fromEntries(
            validationResult.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
        );
        return NextResponse.json({
            errors
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    const {confirmPassword, ...payload} = body;

    const user = await UserRepository.register(payload);

    return NextResponse.json({
        data: user
    } satisfies ResponseDTO<User>);
}
