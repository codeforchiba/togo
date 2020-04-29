import { Plugin } from '@nuxt/types'
import Airtable from 'airtable'
import AirtableApiClient from '~/modules/airtable-api-client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const airtablePlugin: Plugin = (context, inject) => {
  // @ts-ignore
  const apiBase = new Airtable({ apiKey: process.env.dataApiKey }).base(process.env.baseId)
  inject('dataApi', new AirtableApiClient(apiBase))
}

export default airtablePlugin
