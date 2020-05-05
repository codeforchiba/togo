import { Feature, FeatureCollection, Point } from 'geojson'
import Shop from '~/models/shop'

class ShopFeature implements Feature<Point, Shop> {
  readonly type = 'Feature'
  readonly geometry: Point
  readonly properties: Shop

  constructor (lat: number, lng: number, properties: Shop) {
    this.geometry = { type: 'Point', coordinates: [lng, lat] }
    this.properties = properties
  }
}

class ShopGeoJson implements FeatureCollection<Point, Shop> {
  readonly type = 'FeatureCollection'
  readonly features: Array<Feature<Point, Shop>>

  constructor (shops: ReadonlyArray<Shop>) {
    this.features = shops
      .filter(shop => (typeof shop.lat === 'number') && (typeof shop.lng === 'number'))
      .map((shop) => {
        const lat = shop.lat as number
        const lng = shop.lng as number
        return new ShopFeature(lat, lng, shop)
      })
  }
}

export default ShopGeoJson
