import Airtable from 'airtable'
import data from '../data/area.json'
import AirtableApiClient from '../modules/airtable-api-client'
import Area from '~/models/area'

interface Route {
  route: string,
  payload: Payload
}

interface Payload {
  area?: Area
  records?: Array<Area>
}

const buildRouteWithPayload = async () => {
  // @ts-ignore
  const apiBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const client = new AirtableApiClient(apiBase)

  const routes: Array<Route> = await Promise.all(data.map(async (a: any) => {
    const shops = await client.retrieve(a.name)
    const area: Area = { id: a.id, name: a.name, shops }
    return { route: `/${area.id}`, payload: { area } }
  }))

  const records: Array<Area> = routes.map((r) => { return r.payload.area! })

  routes.push({ route: '/', payload: { records } })
  return routes
}

export default buildRouteWithPayload
