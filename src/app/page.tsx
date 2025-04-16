import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Bienvenido a {process.env.NEXT_PUBLIC_APP_NAME}</h1>
      </main>
      <footer className={styles.footer}>Creado por Generali</footer>
    </div>
  );
}