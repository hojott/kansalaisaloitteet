'use client'

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { getKansalaisaloitteet } from "./services/kansalaisaloiteService";
import { getKeskustelualoitteet } from "./services/keskustelualoiteService";
import { addEduskuntaTunnisteet } from "./services/aloitescraperService";
import { Aloite, AloiteData } from "./types/aloite";
import { AloiteState, AloiteStep } from "./types/enums";

export default function Home() {
  const [aloitteet, setAloitteet] = useState<AloiteData>({
    all: [],
    enoughVoters: [],
    notEnoughVoters: [],
    verified: [],
    initiated: [],
    committeeHandled: [],
    rejected: [],
    expired: [],
    firstReaded: [],
    secondReaded: [],
    approved: []
  });

  useEffect(() => {
    getKansalaisaloitteet()
      .then(newAloitteet => {
        const newInitiatedAloitteet = newAloitteet.filter(
          aloite => aloite.step == AloiteStep.INITIATION
        )

        addEduskuntaTunnisteet(newInitiatedAloitteet)
          .then(() => {
            getKeskustelualoitteet(newInitiatedAloitteet.map(aloite => {
              if (aloite.eduskuntaTunniste) {
                return {id: aloite.eduskuntaTunniste}
              } else {
                return {id: ""}
              }
            }))
              .then(res => {
                console.log(res[0])
              })
          })
      })
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          Kansalaisaloitteet {"\n - "}
          {aloitteet.all.map(k => {
            return k.step == AloiteStep.INITIATION ? k.name : ""
          }).join("\n - ")}

        </div>
      </main>
    </div>
  );
}
