"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                // Auto login after successful registration
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) {
                    setError("Failed to auto-login. Please login manually.");
                } else {
                    router.push("/profile");
                    router.refresh();
                }
            } else {
                const data = await res.json();
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Create an Account</h1>
                <p>Sign up to manage your orders and profile.</p>
                
                {error && <p style={{ color: "red", fontSize: "0.875rem", marginBottom: "1rem" }}>{error}</p>}
                
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left" }}>
                        <label htmlFor="name" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#a1a1aa" }}>Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ 
                                width: "100%", padding: "0.75rem", borderRadius: "0.5rem", 
                                border: "1px solid #27272a", backgroundColor: "#09090b", color: "white" 
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left" }}>
                        <label htmlFor="email" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#a1a1aa" }}>Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ 
                                width: "100%", padding: "0.75rem", borderRadius: "0.5rem", 
                                border: "1px solid #27272a", backgroundColor: "#09090b", color: "white" 
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left" }}>
                        <label htmlFor="password" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#a1a1aa" }}>Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ 
                                width: "100%", padding: "0.75rem", borderRadius: "0.5rem", 
                                border: "1px solid #27272a", backgroundColor: "#09090b", color: "white" 
                            }}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="action-button primary" 
                        disabled={isLoading}
                        style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                    >
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <div style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#a1a1aa", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ height: "1px", backgroundColor: "#27272a", flex: 1 }}></div>
                    <span>OR</span>
                    <div style={{ height: "1px", backgroundColor: "#27272a", flex: 1 }}></div>
                </div>

                <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
                    <button 
                        onClick={() => signIn("google", { callbackUrl: "/profile" })} 
                        className="action-button primary" 
                        style={{ width: "100%", justifyContent: "center", backgroundColor: "white", color: "black", border: "1px solid #e5e5e5" }}
                    >
                        Sign up with Google
                    </button>
                    <button 
                        onClick={() => signIn("github", { callbackUrl: "/profile" })} 
                        className="action-button primary github-button" 
                        style={{ width: "100%", justifyContent: "center" }}
                    >
                        Sign up with GitHub
                    </button>
                </div>

                <p style={{ marginTop: "2rem", fontSize: "0.875rem", color: "#a1a1aa" }}>
                    Already have an account? <Link href="/login" style={{ color: "white", textDecoration: "underline" }}>Log in</Link>
                </p>
            </div>
        </div>
    );
}
