import prisma from '@/app/libs/prismadb';
import getSession from './getSession';

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!currentUser) {
      throw new Error('Please log in to continue.');
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt?.toISOString(),
      updatedAt: currentUser.updatedAt?.toISOString(),
    };
  } catch (err: any) {
    throw new Error(err);
  }
}
