import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  try {
    const profiles = await prisma.profile.findMany({
      where: { userId: currentUser?.id },
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  const body = await req.json();
  const { name, image, ageRestriction } = body;

  try {
    const profileCount = await prisma.profile.count({
      where: { userId: currentUser.id },
    });

    if (profileCount >= 7) {
      return new NextResponse('Maximum profile limit reached');
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        image,
        ageRestriction,
        userId: currentUser.id,
      },
      include: { user: true },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
