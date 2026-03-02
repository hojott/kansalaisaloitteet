
interface KansalaisaloiteCache {
  dateUpdated: Date
  data: Kansalaisaloite[]
}

interface KansalaisaloiteError {
  error: string
}

interface Kansalaisaloite {
  id: string
  url: {
    fi?: string
    sv?: string
  }
  modified?: string // xsd:dateTime, "2012-11-01T13:50:30+02:00"
  state?: string // ACCEPTED / DONE / CANCELLED
  stateDate?: string // xsd:dateTime
  supportCount?: number
  externalSupportCount?: number
  totalSupportCount?: number
  sentSupportCount?: number
  verifiedSupportCount?: number
  verified?: string // xsd:dateTime
  name: {
    fi?: string
    sv?: string
  }
  startDate?: string // xsd:dateTime
  endDate?: string // xsd:dateTime
  proposalType?: string // LAW / PREPARATION
  primaryLanguage?: string // fi / sv
  financialSupport?: boolean
  financialSupportURL?: string // url
  supportStatementsOnPaper?: boolean
  supportStatementsInWeb?: boolean
  supportStatementsRemoved?: string // xsd:dateTime
}

export type { Kansalaisaloite, KansalaisaloiteCache, KansalaisaloiteError }