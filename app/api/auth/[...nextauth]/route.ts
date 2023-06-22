import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        if (!credentials?.password) {
          return null;
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error(
            "We couldn't log you in. Please check your email and password and try again. If you'd like to reset your password, use ‘Forgot Password’ link below (error code 14)."
          );
        }
        return user;
      },
    }),
  ],

  debug: process.env.NODE_ENV !== 'development',

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, //the session will be valid for 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
