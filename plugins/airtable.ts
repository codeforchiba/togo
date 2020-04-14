import Airtable from 'airtable'
import { Plugin } from '@nuxt/types'

declare module '@nuxt/types' {
  interface Context {
    $dataApi: Airtable.Base
  }
}

const airtablePlugin: Plugin = (context) => {
  // @ts-ignore
  context.$dataApi = new Airtable({ apiKey: process.env.dataApiKey }).base(process.env.baseId)
}

export default airtablePlugin
