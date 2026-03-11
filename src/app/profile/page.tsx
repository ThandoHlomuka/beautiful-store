"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [status, session, router]);

    if (status === "loading") {
        return <div style={{ padding: "4rem", textAlign: "center", color: "white" }}>Loading profile...</div>;
    }

    if (!session?.user) {
        return null;
    }

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            if (res.ok) {
                setMessage("Profile updated successfully!");
                setIsEditing(false);
                // Update the session state to reflect new name across app
                await update({ name });
            } else {
                const data = await res.json();
                setMessage(data.error || "Failed to update profile");
            }
        } catch (error) {
            setMessage("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 2rem", color: "white" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>My Profile</h1>
                <button 
                    onClick={() => signOut({ callbackUrl: "/" })}
                    style={{ padding: "0.5rem 1rem", backgroundColor: "#27272a", border: "none", borderRadius: "0.375rem", color: "white", cursor: "pointer" }}
                >
                    Sign Out
                </button>
            </div>

            <div style={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "0.75rem", padding: "2rem", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.5rem" }}>Personal Information</h2>
                
                {message && (
                    <div style={{ padding: "0.75rem", backgroundColor: message.includes("success") ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)", color: message.includes("success") ? "#22c55e" : "#ef4444", borderRadius: "0.375rem", marginBottom: "1rem" }}>
                        {message}
                    </div>
                )}

                {!isEditing ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div>
                            <p style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>Name</p>
                            <p style={{ fontSize: "1rem" }}>{session.user.name || "Not set"}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>Email</p>
                            <p style={{ fontSize: "1rem" }}>{session.user.email}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>Role</p>
                            <p style={{ fontSize: "1rem", textTransform: "capitalize" }}>{(session.user as any)?.role?.toLowerCase() || "User"}</p>
                        </div>
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="action-button primary"
                            style={{ alignSelf: "flex-start", marginTop: "1rem" }}
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label htmlFor="name" style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ padding: "0.75rem", borderRadius: "0.375rem", border: "1px solid #27272a", backgroundColor: "#000", color: "white" }}
                                required
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>Email</label>
                            <input
                                type="email"
                                value={session.user.email || ""}
                                disabled
                                style={{ padding: "0.75rem", borderRadius: "0.375rem", border: "1px solid #27272a", backgroundColor: "#000", color: "#a1a1aa", opacity: 0.7 }}
                            />
                            <span style={{ fontSize: "0.75rem", color: "#a1a1aa" }}>Email cannot be changed.</span>
                        </div>
                        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                            <button type="submit" className="action-button primary" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => { setIsEditing(false); setName(session.user?.name || ""); setMessage(""); }}
                                style={{ padding: "0.5rem 1rem", backgroundColor: "transparent", border: "1px solid #27272a", borderRadius: "0.375rem", color: "white", cursor: "pointer" }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Orders Section Note */}
            <div style={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "0.75rem", padding: "2rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.5rem" }}>Order History</h2>
                <div style={{ textAlign: "center", padding: "2rem", color: "#a1a1aa" }}>
                    <p>No orders found yet.</p>
                </div>
            </div>
        </div>
    );
}
