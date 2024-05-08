import {ResponseDTO} from "@/types/common";
import {CUSTOM_HEADERS} from "@/utils/constants";

const betterFetch = async <T>(endpoint: string | Request | URL, options: RequestInit = {}): Promise<ResponseDTO<T> & {count?: string}> => {
    const beUri = process.env["NEXT_PUBLIC_BE_URI"];

    if (!beUri) {
        throw new Error("Missing be URI");
    }

    const apiPath = "/api/";

    const res = await fetch(
        `${beUri}${apiPath}${endpoint}`,
        options
    );

    if (!res.ok) {
        throw new Error("Fetch error");
    }

    const count = res.headers.get(CUSTOM_HEADERS.X_TOTAL_COUNT);

    const {
        message, data, errors
    } = (await res.json()) as ResponseDTO<T>;

    return {
        data,
        message,
        errors,
        ...count && {count}
    }
}

export default betterFetch;
