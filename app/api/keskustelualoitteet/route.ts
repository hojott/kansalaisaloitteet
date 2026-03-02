import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'
import { parseStringPromise } from 'xml2js';
import { Keskustelualoite, KeskustelualoiteCache, KeskustelualoiteError } from "@/app/types/keskustelualoitteet";

const constructor = (initial: KeskustelualoiteCache): KeskustelualoiteCache => {
  return initial
}

const cache = constructor({ dateUpdated: new Date(0), data: [] })

const GET = async (req: NextRequest): Promise<NextResponse<Keskustelualoite[] | KeskustelualoiteError>> => {
  try {
    const reqParams = new URL(req.url).searchParams
    const ids = reqParams.get("ids")?.split(",")
    if (!ids) {
      throw new Error("No ids!")
    }

    const link = `https://avoindata.eduskunta.fi/api/v1/tables/VaskiData/rows`
    const keskustelualoitePromises: Promise<Keskustelualoite>[] = []
    let params: string

    const currentDate = new Date()
    if (currentDate.getTime() - cache.dateUpdated.getTime() < 86400000) {
      return NextResponse.json(cache.data)
    }

    ids.forEach(id => {
      params = `?columnName=Eduskuntatunnus&columnValue=${ id }`

      console.log(`Fetching request ${ id }`) 
      keskustelualoitePromises.push(axios.get(link+params)
        .then(res => {
          const results: string[][] = res.data.rowData
          const ATTACHMENT_GROUP_ID = 5
          const XML_DATA = 1
          
          if (results.length == 0) {
            console.log("Helvetin eduskunta")
            console.log(res.config.url)
            return null
          }

          // the correct keskustelualoite has no attachment group id
          const oikeaKeskustelualoite = results.filter(
            (row: string[]) => row[ATTACHMENT_GROUP_ID] === null
          )[0]

          const xmlKeskustelualoite = oikeaKeskustelualoite[XML_DATA]
          xmlKeskustelualoite.replace("\\", "")

          return parseStringPromise(xmlKeskustelualoite)
        })
      )
    })

    return Promise.all(keskustelualoitePromises)
      .then(keskustelualoitteet => {
        keskustelualoitteet = keskustelualoitteet.filter(aloite => !!aloite)
        console.log("All keskustelualoitteet resolved")

        cache.dateUpdated = new Date(0)
        cache.data = keskustelualoitteet

        return NextResponse.json(keskustelualoitteet)
      })


  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to reach keskustelualoite API"

    return NextResponse.json({ error: message }, { status: 502 })
  }
}

export { GET }