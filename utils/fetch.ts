import {ResponseDTO} from "@/types/common";

const betterFetch = async <T>(endpoint: string | Request | URL, options: RequestInit = {}): Promise<ResponseDTO<T> & {count?: string}> => {
    const res = await fetch(
        endpoint,
        options
    );

    if (!res.ok) {
        throw new Error("Fetch error");
    }

    const count = res.headers.get('x-total-count');

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
