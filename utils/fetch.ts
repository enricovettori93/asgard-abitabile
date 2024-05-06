const betterFetch = async (endpoint: string | Request | URL, options: RequestInit) => {
    const res = await fetch(
        endpoint,
        options
    );

    if (!res.ok) {
        throw new Error("Fetch error");
    }

    return (await res.json()).data;
}

export default betterFetch;
