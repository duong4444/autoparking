import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  AuthProviderType,
  GetAuthProviderDocument,
  LoginDocument,
  CreateUserWithProviderDocument,
} from '@autospace/network/src/gql/generated';
import { fetchGraphQL } from '../fetch';
import * as jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

const MAX_AGE = 1 * 24 * 60 * 60;

export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    // Google OAuth provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Credentials provider configuration for email/password authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // Authorize function to validate user credentials
      async authorize(credentials) {
        // Implement credential validation logic
        if (!credentials) {
          throw new Error('Email and password are required');
        }
        const { email, password } = credentials;

        try {
          const { data, error } = await fetchGraphQL({
            document: LoginDocument,
            variables: { loginInput: { email, password } },
          });

          if (!data?.login.token || error) {
            throw new Error(
              'Authentication failed: Invalid credentials or user not found',
            );
          }
          const uid = data.login.user.uid;
          const image = data.login.user.image;
          const name = data.login.user.name;

          return { id: uid, name, image, email }; // return authenticated user
        } catch (error) {}
        return null;
      },
    }),
  ],

  // Enable debug mode for development
  debug: true,

  // Configure session settings
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },

  // Configure JWT settings
  jwt: {
    maxAge: MAX_AGE,
    // Custom JWT encoding function
    // token:JWT _ obj representing the JWT payload(user/session info)
    async encode({ token, secret }): Promise<string> {
      // Implement custom JWT encoding logic
      if (!token) {
        throw new Error('Token is undefined');
      }
      const { sub, ...tokenProps } = token;
      // Get the current date in seconds since the epoch
      const nowInSeconds = Math.floor(Date.now() / 1000);
      // Calculate the expiration timestamp
      const expirationTimestamp = nowInSeconds + MAX_AGE;
      return jwt.sign(
        { uid: sub, ...tokenProps, exp: expirationTimestamp },
        secret,
        {
          algorithm: 'HS256',
        },
      );
    },
    // Custom JWT decoding function
    // token:string _ Bearer?????
    async decode({ token, secret }): Promise<JWT | null> {
      // Implement custom JWT decoding logic
      if (!token) {
        throw new Error('Token is undefined');
      }

      try {
        const decodedToken = jwt.verify(token, secret, {
          algorithms: ['HS256'],
        });
        return decodedToken as JWT;
      } catch (error) {
        return null;
      }
      // ...
    },
  },
  //   cookies: {
  //     sessionToken: {
  //       name: `${secureCookies ? '__Secure-' : ''}next-auth.session-token`,
  //       options: {
  //         httpOnly: true,
  //         sameSite: 'lax',
  //         path: '/',
  //         secure: secureCookies,
  //         domain: hostName == 'localhost' ? hostName : '.' + rootDomain, // add a . in front so that subdomains are included
  //       },
  //     },
  //   },

  // Configure callback functions
  callbacks: {
    // Sign-in callback
    // user: representing the authenticated user
    // account: obj describing the authentication provider and account detail
    // ex:
    //  {
    //   provider: "google",
    //   type: "oauth",
    //   access_token: "...",
    //   id_token: "..."
    // }
    async signIn({ user, account }) {
      // Implement sign-in logic, e.g., create user in database
      if (account?.provider === 'google') {
        const { id, name, image } = user;

        const existingUser = await fetchGraphQL({
          document: GetAuthProviderDocument,
          variables: {
            uid: id,
          },
        });

        if (!existingUser.data?.getAuthProvider?.uid) {
          const newUser = await fetchGraphQL({
            document: CreateUserWithProviderDocument,
            variables: {
              createUserWithProviderInput: {
                uid: id,
                type: AuthProviderType.Google,
                image,
                name: name || '',
              },
            },
          });
        }
      }

      return true;
    },
    // Session callback
    // token:JWT _ payload
    async session({ token, session }) {
      // Customize session object based on token data
      if (token) {
        session.user = {
          image: token.picture,
          uid: (token.uid as string) || '',
          email: token.email,
          name: token.name,
        };
      }
      return session;
      // ...
    },
  },

  // Configure custom pages
  pages: {
    signIn: '/signIn',
  },
};
// retrieve the current authentication session
export const getAuth = () => getServerSession(authOptions);