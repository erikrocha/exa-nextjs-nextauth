'use client';
import {signOut} from 'next-auth/react';

export default function Login() {
  return (
    <div>
      <span className="block">dashboard</span>
      <button className="bg-white text-black p-2 rounded-lg"
        onClick={()=>signOut()}
      >
        Salir
      </button>
    </div>
  )
}