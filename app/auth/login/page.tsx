'use client';
import {useForm} from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = handleSubmit(data => {
    console.log(data)
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <label htmlFor="email" className="block">email</label>
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
          type="text"
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

        <button className="block bg-blue-500 w-full">
          Entrar
        </button>
      </form>
    </div>
  );
}
  