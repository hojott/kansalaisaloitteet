import axios from 'axios'
import { Kansalaisaloite } from "../types"

const getKansalaisaloitteet = (): Promise<Kansalaisaloite[]> => {
  return axios.get("/api/kansalaisaloitteet")
    .then(res => {
      const kansalaisaloitteet: Kansalaisaloite[] = res.data
      console.log(kansalaisaloitteet)
      return kansalaisaloitteet
    })
    .catch(err => {
      console.error(err)
      return [] as Kansalaisaloite[]
    })

}

export { getKansalaisaloitteet }
