import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Bienvenido</h1>
      <Link
        href="/signIn"
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Iniciar sesión
      </Link>
    </main>
  );
}