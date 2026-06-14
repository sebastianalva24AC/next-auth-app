import bcrypt from "bcryptjs";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  loginAttempts: number;
  lockedUntil: number | null;
}

// Base de datos en memoria
export const users: User[] = [];

export async function createUser(name: string, email: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user: User = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    loginAttempts: 0,
    lockedUntil: null,
  };
  users.push(user);
  return user;
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function isAccountLocked(user: User): boolean {
  if (user.lockedUntil && Date.now() < user.lockedUntil) return true;
  return false;
}

export function incrementLoginAttempts(user: User): void {
  user.loginAttempts += 1;
  if (user.loginAttempts >= 3) {
    user.lockedUntil = Date.now() + 5 * 60 * 1000; // bloqueado 5 minutos
    user.loginAttempts = 0;
  }
}

export function resetLoginAttempts(user: User): void {
  user.loginAttempts = 0;
  user.lockedUntil = null;
}