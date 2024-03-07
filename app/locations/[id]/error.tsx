"use client"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string },
    reset: () => void
}) {
    return (
        <div>
            <p>Location Error {JSON.stringify(error)}</p>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}
