import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

type Params = {
  profileId?: string;
};

export async function PUT(req: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  const { profileId } = params;

  const body = await req.json();
  const { name } = body;

  try {
    const profile = await prisma.profile.update({
      where: { id: profileId },
      data: {
        name,
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

export async function DELETE(req: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  const { profileId } = params;

  try {
    const profile = await prisma.profile.delete({
      where: { id: profileId },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
