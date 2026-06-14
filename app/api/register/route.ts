import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/users";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Todos los campos son requeridos" },
      { status: 400 }
    );
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return NextResponse.json(
      { error: "El usuario ya existe" },
      { status: 400 }
    );
  }

  await createUser(name, email, password);

  return NextResponse.json(
    { message: "Usuario creado exitosamente" },
    { status: 201 }
  );
}