'use client'

import { useState, useEffect } from "react";
import { getKansalaisaloitteet } from "./components/kansalaisaloiteService";
import { Kansalaisaloite } from "./types";
import styles from "./page.module.css";

export default function Home() {
  const [kansalaisaloitteet, setKansalaisaloitteet] = useState<Kansalaisaloite[] | null>(null);

  useEffect(() => {
    getKansalaisaloitteet()
      .then(data => {
        setKansalaisaloitteet(data)
    })
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          Kansalaisaloitteet
          {kansalaisaloitteet !== null ? kansalaisaloitteet.map(k => k.name.fi).toString() : ""}

        </div>
      </main>
    </div>
  );
}
