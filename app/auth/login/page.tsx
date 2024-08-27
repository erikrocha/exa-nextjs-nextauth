'use client';
import {useForm} from 'react-hook-form';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';

export default function Login() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log('data: ', data)
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    // Verificar si la respuesta es exitosa
    /* if (!res.ok) {
      throw new Error('Network response was not ok');
    } */
    if (res) {
      if(res && res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        const errorMessage = res.error === 'CredentialsSignin'
          ? 'EL correo o contraseña son incorrectos. Por favor, intente de nuevo.'
          : 'Error en las credenciales';
        alert(errorMessage);
      }
    } else {
      alert('Error en la solicitud de inicio de sesión');
    }
    

    console.log('res: ', res)
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
  