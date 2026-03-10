"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="section" style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>System Unavailable</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: "400px" }}>
                We're currently experiencing some technical difficulties. This might be due to a temporary database connection issue.
            </p>
            <button
                onClick={() => reset()}
                className="hero-cta"
                style={{ border: "none", cursor: "pointer" }}
            >
                Try Again
            </button>
        </div>
    );
}
