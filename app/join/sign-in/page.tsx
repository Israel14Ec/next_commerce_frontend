import Link from 'next/link'
import styles from  "./sign-in.module.scss"
import { LoginForm } from '@/components/Auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "NextCommerce - Iniciar sesión",
  description: "Descubre los mejores juegos para cada plataforma.",
};

export default function SignIn() {
  return (
    <div className={styles.signIn}>
        <h3>Iniciar sesión</h3>

        <LoginForm/>
        <div className={styles.actions} >
          <Link href="/join/sign-up">¿No tienes cuenta?</Link>
        </div>
    </div>
  )
}
