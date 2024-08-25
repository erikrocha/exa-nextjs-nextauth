import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password"}
      },
      authorize(credentials, req){
        console.log(credentials);
        // console.log -> credentials devuelve esto:
        /* {
          csrfToken: '8a0652fbe1f194fee233786f8e4deb275e7252e567058f886f1485bbf6d92881',
          email: 'okerik.com@gmail.com',
          password: 'okerik'
        } */
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}