'use client';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';


export default function Register() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [msg, setMsg] = useState<string | null>(null);
  //const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = handleSubmit(async(data) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('res: ', res);

      
      
      // Verificar si la respuesta es exitosa
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // Intentar convertir la respuesta a JSON
      const resJSON = await res.json();

      // Actualizar el estado con el mensaje recibido
      setMsg(resJSON.message);

      // Actualizar el estado con los errores recibidos
      //setErr(resJSON.errors);

      if (res.ok && !resJSON.errors){
        router.push('/auth/login');
        console.log('zzz')
      }

      console.log('resJSON: ', resJSON.errors)

    } catch (error) {
      console.error('Error fetching data:', error);
      setMsg('Error al procesar la solicitud.');
    }
    
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
        <span className='bg-gray-700 text-white p-2 my-2 rounded-lg block'>{msg}</span>
        <label htmlFor="name" className="block">Nombre</label>
        <input 
          type="text"
          { ...register("name", {
            required: {
              value: true,
              message: "Ingresa tu nombre"
            }
          })}
          className="bg-blue-100"
        />
        { errors.name?.message && (
          <span className="text-red-500 text-xs block mb-2">{errors.name.message as string}</span>
        )}

        <label htmlFor="email" className="block">Email</label>
        <input 
          type="email"
          { ...register("email", {
            required: {
              value: true,
              message: "Ingresa tu email"
            }
          })}
          className="bg-blue-100"
        />
        { errors.email?.message && (
          <span className="text-red-500 text-xs block mb-2">{errors.email.message as string}</span>
        )}

        <label htmlFor="password" className="block">Contraseña</label>
        <input 
          type="password"
          { ...register("password", {
            required: {
              value: true,
              message: "Ingresa tu contraseña"
            }
          })}
          className="bg-blue-100"
        />
        { errors.password?.message && (
          <span className="text-red-500 text-xs block mb-2">{errors.password.message as string}</span>
        )}

        <label htmlFor="password_confirmation" className="block">Confirmar Contraseña</label>
        <input 
          type="password"
          { ...register("password_confirmation", {
            required: {
              value: true,
              message: "Confirma tu contraseña"
            }
          })}
          className="bg-blue-100"
        />
        { errors.password_confirmation?.message && (
          <span className="text-red-500 text-xs block mb-2">{errors.password_confirmation.message as string}</span>
        )}

        <input 
          type="hidden" 
          value="1" 
          {...register("status", {
            required: {
              value: true,
              message: 'Estado requerido'
            }
          })}
        />

        <button className="block bg-blue-500 w-full">
          Registrar
        </button>
      </form>
      
    </div>
  );
}
  