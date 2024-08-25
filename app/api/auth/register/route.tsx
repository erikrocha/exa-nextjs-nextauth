import { NextResponse } from "next/server";

export async function POST(request: any){ 
  try {
    const data = await request.json();

    const res = await fetch('http://localhost:8000/v1/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Datos que vienen del formulario
    console.log('Request Data:', data);

    // Convertir la respuesta a JSON
    const resData = await res.json();

    // respuesta json del endpoint (api)
    console.log('Response Data:', resData);

    if (resData.message) {
      //console.log('Error Message:', resData.message);
      return NextResponse.json(
        { message: resData.message},
      )
    }

    return NextResponse.json(
      { message: 'Registro exitoso' }, 
      { status: 200 }
    );

    /* console.log('POST request received')
    return NextResponse.json({ message: 'nextResponse abc!' }); */

    //return res
    /* console.log(res);
    */
    //return NextResponse.json('registrando...');
  } catch (error) {
    console.error('Error in POST handler:', error);
    // Retornar un mensaje de error en formato JSON
    return NextResponse.json(
      { message: 'Error en el servidor' }, 
      { status: 500 }
    );
  }
  
}
  