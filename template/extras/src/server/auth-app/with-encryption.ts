import Encryption from '~/lib/encryption/Encryption';
import { getStaffByStaffId } from '~/services/staffs-services';
import type { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import MemberData from './MEMBER_DATA.json';

function getMockData(securityNo: string, staffId: string) {
    return { staffId: '1'}
  }

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
          const { staffId, securityNo } = credentials;
          // Encrypt or Hash the credentials before send to the API
          const [encryptedSecurityNo, encryptedStaffId] = await Promise.all([
            Encryption.encryptString(securityNo),
            Encryption.encryptString(staffId),
          ]);
          const staff = getMockData(
            encryptedStaffId,
            encryptedSecurityNo,
          );

          return {
            id: staff.staffId,
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
