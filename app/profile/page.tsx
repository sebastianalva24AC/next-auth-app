import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/signIn");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Perfil</h1>
      {session.user?.image && (
        <Image
          src={session.user.image}
          alt="Foto de perfil"
          width={80}
          height={80}
          className="rounded-full"
        />
      )}
      <p><strong>Nombre:</strong> {session.user?.name}</p>
      <p><strong>Email:</strong> {session.user?.email}</p>
      <LogoutButton />
    </div>
  );
}