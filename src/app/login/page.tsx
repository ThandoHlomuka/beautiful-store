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
    </div>
  );
}
