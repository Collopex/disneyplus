import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  const body = await req.json();
  const { id } = body;

  try {
    await prisma.profile.updateMany({
      data: { selected: false },
    });

    const selectedProfile = await prisma.profile.update({
      where: { id },
      data: { selected: true },
    });

    return NextResponse.json(selectedProfile);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
