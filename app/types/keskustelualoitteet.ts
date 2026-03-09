
interface KeskustelualoiteCache {
  dateUpdated: Date
  data: Keskustelualoite[]
}

interface KeskustelualoiteError {
  error: string
}

interface Keskustelualoite {
  data: XMLDocument
}

export type { Keskustelualoite, KeskustelualoiteCache, KeskustelualoiteError }