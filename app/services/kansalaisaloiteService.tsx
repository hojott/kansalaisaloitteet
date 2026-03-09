import axios from 'axios'
import { Kansalaisaloite } from "../types/kansalaisaloitteet"
import { Aloite } from '../types/aloite'
import { AloiteState, AloiteStep } from '../types/enums'

const getKansalaisaloitteet = async (): Promise<Aloite[]> => {
  return axios.get("/api/kansalaisaloitteet")
    .then(res => {
      const kansalaisaloitteet: Kansalaisaloite[] = res.data
      const aloitteet = kansalaisaloitteet.map(aloite => createAloite(aloite))
      return aloitteet
    })
    .catch(err => {
      console.error(err)
      return []
    })

}

const createAloite = (kansalaisaloite: Kansalaisaloite): Aloite => {
  let name: string
  if (kansalaisaloite.name.fi) {
    name = kansalaisaloite.name.fi
  } else if (kansalaisaloite.name.sv) {
    name = kansalaisaloite.name.sv
  } else {
    name = ""
  }

  let startDate: Date
  if (kansalaisaloite.startDate) {
    startDate = new Date(kansalaisaloite.startDate)
  } else {
    startDate = new Date(0)
  }

  let url: string
  if (kansalaisaloite.url.fi) {
    url = kansalaisaloite.url.fi
  } else if (kansalaisaloite.url.sv) {
    url = kansalaisaloite.url.sv
  } else {
    url = ""
  }

  const kansalaisaloiteId: number = +kansalaisaloite.id.replace(
    "https://www.kansalaisaloite.fi/api/v1/initiatives/", ""
  )

  let state: AloiteState
  let step: AloiteStep
  let voted: {start: Date, end: Date} | undefined = undefined
  let verified: {start: Date, end: Date} | undefined = undefined
  const today = new Date()
  const endDate = kansalaisaloite.endDate ? new Date(kansalaisaloite.endDate) : new Date(0)
  const verifyDate = kansalaisaloite.verified ? new Date(kansalaisaloite.verified) : new Date(0)
  const totalSupportCount = kansalaisaloite.totalSupportCount ? kansalaisaloite.totalSupportCount : 0
  const verifiedSupportCount = kansalaisaloite.verifiedSupportCount ? kansalaisaloite.verifiedSupportCount : 0
  if (kansalaisaloite.state == "CANCELED") {
    if (startDate < today ) {
      state = AloiteState.CANCELED
      step = AloiteStep.NOT_STARTED
    } else if (endDate < today) {
      state = AloiteState.CANCELED
      step = AloiteStep.VOTE_COLLECTION
    } else {
      state = AloiteState.CANCELED
      step = AloiteStep.VERIFICATION
      if (totalSupportCount > 50000) {
        voted = { start: startDate, end: endDate }
      }
    }
  } else if (kansalaisaloite.state == "ACCEPTED") {
    if (startDate < today) {
      state = AloiteState.ONGOING
      step = AloiteStep.NOT_STARTED
    } else if (endDate < today) {
      state = AloiteState.ONGOING
      step = AloiteStep.VOTE_COLLECTION
    } else if (totalSupportCount < 50000) {
      state = AloiteState.NOVOTERS
      step = AloiteStep.VOTE_COLLECTION
    } else if (verifiedSupportCount == 0) {
      state = AloiteState.ONGOING
      step = AloiteStep.VERIFICATION
      voted = { start: startDate, end: endDate }
    } else if (verifiedSupportCount < 50000) {
      state = AloiteState.NOVOTERS
      step = AloiteStep.VERIFICATION
      voted = { start: startDate, end: endDate }
    } else if (!!kansalaisaloite.verified) {
      state = AloiteState.ONGOING
      step = AloiteStep.VERIFICATION
      voted = { start: startDate, end: endDate }
    } else {
      state = AloiteState.ONGOING
      step = AloiteStep.VERIFICATION
      voted = { start: startDate, end: endDate }
      verified = { start: endDate, end: verifyDate }
    }
  } else if (kansalaisaloite.state == "DONE") {
    state = AloiteState.ONGOING
    step = AloiteStep.INITIATION
    voted = { start: startDate, end: endDate }
    verified = { start: endDate, end: verifyDate }
  } else {
    state = AloiteState.ONGOING
    step = AloiteStep.NOT_STARTED
  }

  const aloite: Aloite = {
    name: name,
    startDate: startDate,
    link: url,
    kansalaisaloiteId: kansalaisaloiteId,
    state: state,
    step: step,
    votes: verifiedSupportCount,
    voted: voted,
    verified: verified,
  }

  return aloite
}

export { getKansalaisaloitteet }
