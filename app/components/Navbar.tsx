import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Navbar() {
  const session = await getServerSession(authOptions)
  console.log('session', session)
  /* session {
    user: { name: 'user_20', email: 'user_20@gmail.com', image: undefined 
  } */
  console.log('name ', session?.user?.name)
  return (
    <nav className="flex justify-between items-center">
      <h1>NextAuth</h1>
      <ul className="flex gap-x-2 py-3">
        {!session?.user ? (
          <>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
                <Link href='/auth/login'>Login</Link>
            </li>
            <li>
                <Link href='/auth/register'>Register</Link>
            </li>
          </>
        ) : (
          <>
            <span>{session.user.name}</span>
            <li>
                <Link href='/dashboard'>Dashboard</Link>
            </li>
            <li>
                <Link href='/api/auth/signout'>Salir</Link>
            </li>
          </>
            
        )}
        
      </ul>
    </nav>
  )
}