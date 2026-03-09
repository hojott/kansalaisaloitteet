import axios from 'axios'
import { EduskuntaTunniste } from "../types/aloitescraper"
import { Aloite } from '../types/aloite'

const addEduskuntaTunnisteet = async (aloitteet: Aloite[]): Promise<boolean> => {
  const idsSmashed = aloitteet.map(aloite => aloite.kansalaisaloiteId).join(",")

  return axios.get(`/api/aloitescraper?ids=${idsSmashed}`)
    .then(res => {
      aloitteet.forEach((aloite, i) => {
        aloite.eduskuntaTunniste = res.data[i].id
      })
      return true
    })
    .catch(err => {
      console.error(err)
      return false
    })
}

export { addEduskuntaTunnisteet }
