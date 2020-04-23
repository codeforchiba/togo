import Airtable, { Attachment, FieldSet, Record } from 'airtable'
import { Plugin } from '@nuxt/types'

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
    const coverImage = this.detectImage((record.fields['Cover Image'] as ReadonlyArray<Attachment>))
    const pictures = this.detectImages((record.fields.Pictures as ReadonlyArray<Attachment>))

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
      coverImagePath: coverImage ? coverImage.url : undefined,
      pictures: pictures ? pictures.map(a => a.url) : undefined,
      menus: record.fields.Menus as string,
      notes: record.fields.Notes as string
    })
  }

  detectImage (images: ReadonlyArray<Attachment>): Attachment | undefined {
    if (images && images.length > 0) {
      return images[0]
    }

    return undefined
  }

  detectImages (images: ReadonlyArray<Attachment>): ReadonlyArray<Attachment> {
    if (images) {
      return images
    }

    return []
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const airtablePlugin: Plugin = (context, inject) => {
  // @ts-ignore
  const apiBase = new Airtable({ apiKey: process.env.dataApiKey }).base(process.env.baseId)
  inject('dataApi', new AirtableApiClient(apiBase))
}

export default airtablePlugin
