import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'
import * as cheerio from "cheerio";
import { EduskuntaTunniste, AloiteScraperCache, AloiteScraperError } from "@/app/types/aloitescraper";

const constructor = (initial: AloiteScraperCache): AloiteScraperCache => {
  return initial
}

const cache = constructor({ dateUpdated: new Date(0), data: [] })

const GET = async (req: NextRequest): Promise<NextResponse<EduskuntaTunniste[] | AloiteScraperError>> => {
  try {
    const reqParams = new URL(req.url).searchParams
    const ids = reqParams.get("ids")?.split(",")
    if (!ids) {
      throw new Error("No ids!")
    }

    const link = `https://www.kansalaisaloite.fi/fi/aloite/`
    const scrapedSitePromises: Promise<string>[] = []

    const currentDate = new Date()
    if (currentDate.getTime() - cache.dateUpdated.getTime() < 86400000) {
      return NextResponse.json(cache.data)
    }

    ids.forEach(id => {
      console.log(`Fetching site ${ id }`) 
      scrapedSitePromises.push(axios.get(link+id)
        .then(res => {
          const html: string = res.data
          const selector = cheerio.load(html)
          
          const aloiteId: string = selector(".info>a").text()

          return aloiteId
        })
      )
    })

    return Promise.all(scrapedSitePromises)
      .then(scrapedSites => {
        const eduskuntaTunnisteet: EduskuntaTunniste[] = scrapedSites.map(aloite => {
          return { id: aloite }
        })

        console.log("All sites scraped")

        cache.dateUpdated = new Date(0)
        cache.data = eduskuntaTunnisteet

        return NextResponse.json(eduskuntaTunnisteet)
      })


  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to reach aloitescraper API"

    return NextResponse.json({ error: message }, { status: 502 })
  }
}

export { GET }