'use client'

import { useState, useEffect } from "react";
import { getKansalaisaloitteet } from "./services/kansalaisaloiteService";
import { Kansalaisaloite } from "./types/kansalaisaloitteet";
import styles from "./page.module.css";
import { Keskustelualoite } from "./types/keskustelualoitteet";
import { getKeskustelualoitteet } from "./services/keskustelualoiteService";
import { getEduskuntaTunnisteet } from "./services/aloitescraperService";
import { Aloite } from "./types/aloite";

interface KansalaisaloiteData {
  all: Aloite[]
  enoughVoters: Aloite[]
  notEnoughVoters: Aloite[]
  verified: Aloite[]
  couldntVerify: Aloite[]
  initiated: Aloite[]
  committeeHandled: Aloite[]
  rejected: Aloite[]
  expired: Aloite[]
  firstReaded: Aloite[]
  secondReaded: Aloite[]
  approved: Aloite[]
}

export default function Home() {
  const [kansalaisaloitteet, setKansalaisaloitteet] = useState<Kansalaisaloite[] | null>(null);
  const [passedAloitteet, setPassedAloitteet] = useState<Kansalaisaloite[] | null>(null)
  const [keskusteluAloitteet, setKeskustelualoitteet] = useState<Keskustelualoite[] | null>(null)

  useEffect(() => {
    getKansalaisaloitteet()
      .then(data => {
        setKansalaisaloitteet(data)
        const newPassedAloitteet = data.filter(k => k.state == "DONE")
        console.log(newPassedAloitteet)
        setPassedAloitteet(newPassedAloitteet)
        const passedAloiteIds = newPassedAloitteet.map(k => k.id)
        getEduskuntaTunnisteet(passedAloiteIds)
          .then(data => {
            getKeskustelualoitteet(data)
              .then(data => {
                const newKeskustelualoitteet = data
                console.log(newKeskustelualoitteet)
                setKeskustelualoitteet(data)
              })
          })      
      })
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          Kansalaisaloitteet
          {kansalaisaloitteet !== null ? kansalaisaloitteet.map(k => {
            return k.state == "CANCELED" ? k.name.fi : ""
          }).join(" ") : ""}

        </div>
      </main>
    </div>
  );
}
