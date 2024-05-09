import {deleteSession} from "@/utils/session";
import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";

export async function GET() {
    deleteSession();

    return NextResponse.json({message: "User logout"} satisfies ResponseDTO<never>);
}
