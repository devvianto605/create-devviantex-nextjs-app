import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { taintObjectReference } from 'next/dist/server/app-render/entry-base';
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

          // TODO: Add BE Authentication service and Token management service here!

          return {
            id: String(Math.floor(Math.random() * 99999999) + 1),
            authorized: true
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

    // jwt(): This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
    // The arguments user, account, profile and isNewUser are only passed the first time this callback is called on a new session, after the user signs in. In subsequent calls, only token will be available.
    // The contents user, account, profile and isNewUser will vary depending on the provider and if you are using a database. You can persist data such as User ID, OAuth Access Token in this token
    async jwt({ token, trigger, session: updatedSession, user }) {

      // TODO: JWT Token Management: Read more at next-auth docs
      token.user = user

      // Implement session update function here
      if (trigger === "update" && updatedSession?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = updatedSession.name
      }

      return token;
    },

    // The session callback is called whenever a session is checked. By default, only a subset of the token is returned for increased security.
    session: ({ session, user, token }) => ({
      ...session,
      user: {
        ...token.user as User,
      },
    }),
  },
};
