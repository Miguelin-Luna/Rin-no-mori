import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { User } from 'next-auth';

export async function requireAdmin(): Promise<User> {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin');
  }

  const user = session.user as User & { role?: string };

  if (user.role !== 'ADMIN') {
    redirect('/cuenta'); // Redirigir a usuarios no administradores a su cuenta
  }

  return session.user;
}

export async function checkAdminAPI() {
  const session = await auth();
  const user = session?.user as User & { role?: string };
  
  if (!session?.user || user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  return session.user;
}
