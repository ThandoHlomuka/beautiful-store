import { signIn } from "@/auth";

export default function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Admin Login</h1>
                <p>Sign in to manage your store inventory and orders.</p>
                <form
                    action={async () => {
                        "use server";
                        await signIn("github", { redirectTo: "/admin" });
                    }}
                >
                    <button type="submit" className="action-button primary github-button">
                        Sign in with GitHub
                    </button>
                </form>
            </div>

            <style jsx>{`
        .login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          color: white;
        }
        .login-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 3rem;
          border-radius: 1rem;
          text-align: center;
          max-width: 400px;
          width: 90%;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        h1 {
          margin-bottom: 1rem;
          font-size: 2rem;
          background: linear-gradient(to right, #fff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          margin-bottom: 2rem;
          color: #aaa;
        }
        .github-button {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
        </div>
    );
}
