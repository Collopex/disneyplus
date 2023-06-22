import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response('User already exists!', {
        status: 403,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const account = await prisma.user.create({
      data: { email, hashedPassword },
    });

    return NextResponse.json(account);
  } catch (error: any) {
    throw new NextResponse(error);
  }
}
