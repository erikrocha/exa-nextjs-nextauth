'use client';
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = handleSubmit(async(data) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const resJSON = await res.json();
    console.log(resJSON);
  })

  console.log(errors)

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
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

        <button className="block bg-blue-500 w-full">
          Registrar
        </button>
      </form>
      
    </div>
  );
}
  