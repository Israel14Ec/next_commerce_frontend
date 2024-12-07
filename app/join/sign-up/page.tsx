import Link from 'next/link'
import styles from './sign-up.module.scss'
import { RegisterForm } from '@/components/Auth'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "NextCommerce - Crear cuenta",
  description: "Descubre los mejores juegos para cada plataforma.",
};

export default function SignUp() {
  return (
    <div className={styles.signIn}>
        <h3>Crear cuenta</h3>
        <RegisterForm />
        <div className={styles.actions}>
          <Link href="/join/sign-in">
            Atrás
          </Link>
        </div>
    </div>
  )
}
