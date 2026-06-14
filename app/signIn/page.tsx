"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error === "AccountLocked") {
      setError("Cuenta bloqueada por múltiples intentos fallidos. Intenta en 5 minutos.");
    } else if (result?.error) {
      setError("Email o contraseña incorrectos.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar sesión</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-gray-800"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-gray-800"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">o</span>
          </div>
        </div>

        <button
          onClick={() => signIn("google", { redirectTo: "/dashboard" })}
          className="flex items-center gap-3 w-full border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 mb-3"
        >
          <FcGoogle size={24} />
          <span className="text-gray-800">Continuar con Google</span>
        </button>

        <button
          onClick={() => signIn("github", { redirectTo: "/dashboard" })}
          className="flex items-center gap-3 w-full bg-gray-900 text-white rounded px-4 py-2 hover:bg-gray-700 mb-4"
        >
          <FaGithub size={24} />
          <span>Continuar con GitHub</span>
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-blue-500 underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}