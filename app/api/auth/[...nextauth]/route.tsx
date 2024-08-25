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
      async authorize(credentials, req){
        console.log('credentials: ', credentials);
        /* console.log */
        /* credentials:  {
          csrfToken: '71afeeeb8fc5f1607a2f437c5881115e4c6a90258a98a28ba9041c4fd45db318',
          email: 'user_29@gmail.com',
          password: 'user_29'
        } */

        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const res = await fetch(`http://localhost:8000/v1/checkEmailExists`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer 1|ygzRM0iXyuAEbzILvpIDkGVeHvnpjqmbwoyJTNeA`
          },
          body: JSON.stringify({ 
            email: credentials.email,
            password: credentials.password 
          }),
        });

        // si existe el usuario
        const userExists = await res.json();

        console.log('userExists: ', userExists);
        /* console.log */
        /* userExists:  true */

        // revisando si existe el usuario v1
        // if (!userExists) return null;

        // revisando si existe el usuario v2
        if (!userExists || Object.keys(userExists).length === 0) {
          console.log('Invalid credentials');
          return null;
        }

        return {
          id: userExists.id,
          name: userExists.name,
          email: userExists.email,          
        };

        return null;

        // .env -> NEXTAUTH_URL="http://localhost:3000"
        // cuando el login es true, se va esa url
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}