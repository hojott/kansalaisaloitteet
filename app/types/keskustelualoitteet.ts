
interface KeskustelualoiteCache {
  dateUpdated: Date
  data: Keskustelualoite[]
}

interface KeskustelualoiteError {
  error: string
}

interface Keskustelualoite {
  Siirto: {
    SiirtoMetatieto: {
      JulkaisuMetatieto: {
        IdentifiointiOsa: {
          AsiakirjatyyppiNimi: string
          EduskuntaTunniste: {
            AsiakirjatyyppiKoodi: string
            AsikirjaNroTeksti: string
            ValtiopaivavuosiTeksti: string
          }
          VireilleTulo: {
            EduskuntaTunnus: string
          }
          Nimeke: {
            NimekeTeksti: string
          }
        }
      }
    }
  }
  
}

export type { Keskustelualoite, KeskustelualoiteCache, KeskustelualoiteError }