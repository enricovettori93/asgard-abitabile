import {NextRequest, NextResponse} from "next/server";
import UserRepository from "@/repositories/user.repository";
import {ResponseDTO} from "@/types/common";
import {SafeUser} from "@/types/user";
import {getUserIdFromRequest} from "@/utils/session";

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
