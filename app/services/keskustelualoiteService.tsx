import axios from 'axios'
import { Keskustelualoite } from "../types/keskustelualoitteet"
import { EduskuntaTunniste } from '../types/aloitescraper'

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

export { getKeskustelualoitteet }
