import { NextResponse } from "next/server";
import axios from 'axios'
import { Kansalaisaloite, KansalaisaloiteCache, KansalaisaloiteError } from "@/app/types/kansalaisaloitteet";

const constructor = (initial: KansalaisaloiteCache): KansalaisaloiteCache => {
  return initial
}

const cache = constructor({ dateUpdated: new Date(0), data: [] })

const GET = async (): Promise<NextResponse<Kansalaisaloite[] | KansalaisaloiteError>> => {
  try {
    const kansalaisaloitePromises: Promise<Kansalaisaloite[] | undefined>[] = []
    let offset = 0
    let running = true

    const link = `https://www.kansalaisaloite.fi/api/v1/initiatives`
    let params: string

    const currentDate = new Date()
    if (currentDate.getTime() - cache.dateUpdated.getTime() < 86400000) {
      return NextResponse.json(cache.data)
    }

    while ( running ) {
      console.log(`Fetching request ${offset}/2000...`)
      params = `?offset=${ offset * 50 }&limit=50&orderBy=createdOldest`
      kansalaisaloitePromises.push(axios.get(link+params)
        .then(res => {
          const newKansalaisaloitteet: Kansalaisaloite[] = res.data

          return newKansalaisaloitteet
        })
      )

      offset += 1
      if (offset == 2000) { running = false }
    }
    return Promise.all(kansalaisaloitePromises)
      .then(lists => {
        const kansalaisaloitteet: Kansalaisaloite[] = lists.flat().filter(aloite => {
          return !!aloite
        })

        console.log("All kansalaisaloitteet resolved")

        cache.dateUpdated = currentDate
        cache.data = kansalaisaloitteet

        return NextResponse.json(kansalaisaloitteet)
      })


  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to reach kansalaisaloite API"

    return NextResponse.json({ error: message }, { status: 502 })
  }
}

export { GET }