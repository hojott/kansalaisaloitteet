import axios from 'axios'
import { EduskuntaTunniste } from "../types/aloitescraper"

const getEduskuntaTunnisteet = async (ids: string[]): Promise<EduskuntaTunniste[]> => {
  const idsCut = ids.map(id => {
    return id.replace("https://www.kansalaisaloite.fi/api/v1/initiatives/", "") // 131
  }).join(",")
  return axios.get(`/api/aloitescraper?ids=${idsCut}`)
    .then(res => {
      const eduskuntaTunnisteet: EduskuntaTunniste[] = res.data
      return eduskuntaTunnisteet
    })
    .catch(err => {
      console.error(err)
      return []
    })
}

export { getEduskuntaTunnisteet }
