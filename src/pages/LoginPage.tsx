import { z } from "zod";
import { useUserStore } from "../store/useUserStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import styles from './LoginPage.module.css'

const loginSchema = z.object({
  email: z.string().email("Invalid e-mail."),
  password: z.string().min(4, "Password must contain at least 4 characters.")
})

type LoginFormInputs = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  })

  function onSubmit(data: LoginFormInputs) {
    const userId = new Date().getTime()
    setUser({
      email: data.email,
      id: userId,
      password: data.password
    })
    alert("Login successful!")
    navigate('/orders')
  }

  return (
    <div className={styles.container}>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label>E-mail</label>
          <input type="email" {...register('email')} />
          {errors.email && (
            <p style={{ color: 'red', fontSize: 12 }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && (
            <p style={{ color: 'red', fontSize: 12 }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}