import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import MemberData from './MEMBER_DATA.json';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        staffId: { label: 'Staff Id', type: 'text' },
        securityNo: { label: 'Security No', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {

        // Authentication logic here or api invoker

          return {
            id: String(Math.floor(Math.random() * 99999999) + 1),
            authuthorized: true
          };
        } catch (error) {
          throw new Error(`${(error as Error).message}`);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 2592000,
  },
  callbacks: {
    async jwt({ token, trigger, session: newSession }) {

      return token;
    },
    async session({ session, token }) {
      session.user = token as unknown as User;

      return session;
    },
  },
};
