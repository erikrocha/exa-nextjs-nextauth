import { NextResponse } from "next/server";

export async function POST(request: any){ 
  const data = await request.json();

  const res = await fetch('http://localhost:8000/v1/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  console.log(data);
  return res
  //return NextResponse.json('registrando...');
}
  