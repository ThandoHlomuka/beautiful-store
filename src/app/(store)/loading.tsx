export default function Loading() {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-main)"
        }}>
            <p style={{ fontWeight: 500, letterSpacing: "0.05em", opacity: 0.8 }}>Loading LUXE Experience...</p>
        </div>
    );
}
