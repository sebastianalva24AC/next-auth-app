import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/signIn");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Bienvenido, {session.user?.name}</p>
      <Link href="/profile" className="text-blue-500 underline">
        Ver perfil
      </Link>
      <LogoutButton />
    </div>
  );
}