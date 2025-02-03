import { prisma } from '@/lib/prisma';
import { Argon } from '@/utils/cryptography';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserRole } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { CustomError } from '../../../utils/error';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identity_number: { label: 'Nomor Identitas', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    if (
                        !credentials?.identity_number ||
                        !credentials?.password
                    ) {
                        throw new CustomError(401, 'Missing credentials');
                    }

                    const user = await prisma.teacher.findUnique({
                        where: {
                            identity_number: credentials.identity_number,
                        },
                    });

                    if (!user) {
                        throw new CustomError(401, 'Wrong Credential');
                    }

                    const isPasswordValid = await Argon.verify(
                        user.password,
                        credentials.password,
                    );

                    if (!isPasswordValid) {
                        throw new CustomError(401, 'Wrong Credential');
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        role: user.role as UserRole,
                        fullname: user.fullname,
                        identity_number: user.identity_number,
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    throw new CustomError(401, 'Wrong Credential');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.identity_number = user.identity_number;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as UserRole;
                session.user.id = token.id as string;
                session.user.identity_number = token.identity_number as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/auth/signout',
    },
};

export default NextAuth(authOptions);
