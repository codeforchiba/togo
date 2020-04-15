import Airtable, { Attachment, FieldSet, Record } from 'airtable'
import { Context, Plugin } from '@nuxt/types'

import Shop from '../models/shop'

declare module '@nuxt/types' {
  interface Context {
    $dataApi: AirtableApiClient
  }
}

class AirtableApiClient {
  readonly apiBase: Airtable.Base

  constructor (apiBase: Airtable.Base) {
    this.apiBase = apiBase
  }

  async retrieve (area: string, options: object = {}): Promise<ReadonlyArray<Shop>> {
    const records = await this.apiBase(area).select(options).all()
    return records.map((record: Record<FieldSet>) => this.toShop(record))
  }

  toShop (record: Record<FieldSet>): Shop {
    return new Shop({
      id: record.id,
      name: record.fields.Name as string,
      address: record.fields.Address as string,
      businessHours: record.fields['Business Hours'] as string,
      phone: record.fields.Phone as string,
      url: record.fields.URL as string,
      facebook: record.fields.Facebook as string,
      twitter: record.fields.Twitter as string,
      instagram: record.fields.Instagram as string,
      line: record.fields.Line as string,
      coverImagePath: (record.fields['Cover Image'] as ReadonlyArray<Attachment>)[0].url,
      menus: record.fields.Menus as string,
      notes: record.fields.Notes as string
    })
  }
}

const airtablePlugin: Plugin = (context) => {
  // @ts-ignore
  const apiBase = new Airtable({ apiKey: process.env.dataApiKey }).base(process.env.baseId)
  context.$dataApi = new AirtableApiClient(apiBase)
}

export default airtablePlugin
