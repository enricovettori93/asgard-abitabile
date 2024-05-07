const betterFetch = async<T> (endpoint: string | Request | URL, options: RequestInit = {}): Promise<T> => {
    const res = await fetch(
        endpoint,
        options
    );

    if (!res.ok) {
        throw new Error("Fetch error");
    }

    return (await res.json()).data as T;
}

export default betterFetch;
