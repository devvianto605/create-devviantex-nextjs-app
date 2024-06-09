import Link from "next/link";

import styles from "./index.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Create <span className={styles.orangeSpan}>Devviantex</span> App
        </h1>
        <div className={styles.cardRow}>
          <Link
            className={styles.card}
            href="https://create.devviantex.info/en/introduction"
            target="_blank"
          >
            <h3 className={styles.cardTitle}>Extended Devviantex Adaptation →</h3>
            <div className={styles.cardText}>
              See what's extended from T3 App and what changes, how's project structure,
              how to use all tools and lib.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
