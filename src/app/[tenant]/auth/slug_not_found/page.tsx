"use client";
import { useRouter } from "next/navigation";
import styles from "../../../page.module.css";

export default function LoginPage() {
  const router = useRouter();

  const redirectToHome = () => {
    router.push(`http://${process.env.NEXT_PUBLIC_APP_DOMAIN}`);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Tenant no válido</h1>
        <button onClick={redirectToHome} className={styles.link}>
          Ir al Home
        </button>
      </main>
      <footer className={styles.footer}>Creado por Generali</footer>
    </div>
  );
}
