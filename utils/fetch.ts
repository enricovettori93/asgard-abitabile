import {ResponseDTO} from "@/types/common";
import {CUSTOM_HEADERS} from "@/utils/constants";

const betterFetch = async <T>(endpoint: string | Request | URL, options: RequestInit = {}): Promise<ResponseDTO<T> & {count?: string}> => {
    const beUri = process.env["NEXT_PUBLIC_BE_URI"];
    const apiPath = "/api/";

    if (!beUri) {
        throw new Error("Missing be URI");
    }

    const res = await fetch(
        `${beUri}${apiPath}${endpoint}`,
        options
    );

    const {
        message, data, errors
    } = (await res.json()) as ResponseDTO<T>;

    if (!res.ok) {
        throw new Error(message || "Server error");
    }

    const count = res.headers.get(CUSTOM_HEADERS.X_TOTAL_COUNT);

    return {
        data,
        message,
        errors,
        ...count && {count}
    }
}

export default betterFetch;
