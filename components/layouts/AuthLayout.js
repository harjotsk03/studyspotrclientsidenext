import { useProfile } from "../../hooks/useProfile";
import { useRouter } from "next/router";
import Nav from "../general/Nav.js";

export default function AuthLayout({ children }) {
  const { profile, loading } = useProfile();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    router.push(
      `/application/login?redirect=${encodeURIComponent(router.asPath)}`
    );
    return <div>No profile found</div>;
  }

  return (
    <div className="flex">
      <Nav />
      <main className="flex-1 max-h-screen fade-in-down overflow-y-hidden">
        {children}
      </main>
    </div>
  );
}
