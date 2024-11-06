import Link from 'next/link'
import styles from './sign-up.module.scss'
import { RegisterForm } from '@/components/Auth'

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
