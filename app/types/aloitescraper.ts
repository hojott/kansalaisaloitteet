interface AloiteScraperCache {
  dateUpdated: Date
  data: EduskuntaTunniste[]
}

interface AloiteScraperError {
  error: string
}

interface EduskuntaTunniste {
  id: string
}

export type { EduskuntaTunniste, AloiteScraperCache, AloiteScraperError }