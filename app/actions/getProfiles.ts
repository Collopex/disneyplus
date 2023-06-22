import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';
import { NextResponse } from 'next/server';

export default async function getProfiles() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const profiles = await prisma.user
      .findUnique({
        where: {
          id: currentUser.id,
        },
      })
      .profiles();

    return profiles;
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
