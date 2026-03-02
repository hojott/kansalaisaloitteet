import axios from 'axios'
import { Kansalaisaloite } from "../types/kansalaisaloitteet"

const getKansalaisaloitteet = async (): Promise<Kansalaisaloite[]> => {
  return axios.get("/api/kansalaisaloitteet")
    .then(res => {
      const kansalaisaloitteet: Kansalaisaloite[] = res.data
      return kansalaisaloitteet
    })
    .catch(err => {
      console.error(err)
      return []
    })

}

export { getKansalaisaloitteet }
