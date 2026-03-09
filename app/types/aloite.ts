import { AloiteState, AloiteStep } from "./enums"

interface Aloite {
  name: string
  startDate: Date
  link: string
  kansalaisaloiteId: number
  eduskuntaTunniste?: string
  state: AloiteState
  step: AloiteStep
  votes: number
  voted?: {
    start: Date
    end: Date
  }
  verified?: {
    start: Date
    end: Date
  }
  initiated?:  {
    start: Date
    end: Date
  }
  committeeHandled?: {
    start: Date
    end: Date
  }
  firstReaded?: {
    start: Date
    end: Date
  }
  secondReaded?: {
    start: Date
    end: Date
  }
}

interface AloiteData {
  all: Aloite[]
  enoughVoters: Aloite[]
  notEnoughVoters: Aloite[]
  verified: Aloite[]
  initiated: Aloite[]
  committeeHandled: Aloite[]
  rejected: Aloite[]
  expired: Aloite[]
  firstReaded: Aloite[]
  secondReaded: Aloite[]
  approved: Aloite[]
}



export type { Aloite, AloiteData }