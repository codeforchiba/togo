import { Module } from '@nuxt/types'
import Airtable from 'airtable'
import * as fse from 'fs-extra'
import AirtableApiClient from '../utils/airtable-api-client'
import data from '../data/area.json'
import Area from '../models/area'

const preloadModule: Module = function () {
  this.nuxt.hook('generate:before', async () => {
    // @ts-ignore
    const apiBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
    const client = new AirtableApiClient(apiBase)

    const areas: Array<Area> = await Promise.all(data.map(async (a: any) => {
      const shops = await client.retrieve(a.name)
      return { id: a.id, name: a.name, shops }
    }))

    fse.writeJSONSync('./data/shop.json', areas)
  })
}

export default preloadModule
