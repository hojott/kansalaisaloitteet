import axios from 'axios'
import { Keskustelualoite } from "../types/keskustelualoitteet"
import { EduskuntaTunniste } from '../types/aloitescraper'
import { Aloite } from '../types/aloite'

const getKeskustelualoitteet = async (ids: EduskuntaTunniste[]): Promise<Keskustelualoite[]> => {
  const idsSmashed = ids.map(id => {
    return id.id.replace(" ", "+").replace("/", "%2F") //"KAA+6%2F2025+vp"
  }).join(",")
  return axios.get(`/api/keskustelualoitteet?ids=${idsSmashed}`)
    .then(res => {
      const keskustelualoitteet: Keskustelualoite[] = res.data
      return keskustelualoitteet
    })
    .catch(err => {
      console.error(err)
      return []
    })
}

//const addEduskuntaProcesses = async (aloite: Aloite, keskustelualoite: Keskustelualoite) => {
//  const kasittelyvaiheet = keskustelualoite.
//}

export { getKeskustelualoitteet }
