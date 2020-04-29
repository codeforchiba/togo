import Shop from '~/models/shop'

interface GeoJsonGeometry {
  type: string
  coordinates: any
}

class GeoJsonPointGeometry implements GeoJsonGeometry {
  readonly type: string = 'Point';
  private readonly lat: number;
  private readonly lng: number;

  constructor (lat: number, lng: number) {
    this.lat = lat
    this.lng = lng
  }

  coordinates (): Array<number> {
    return [this.lat, this.lng]
  }
}

interface GeoJsonFeature {
  type: string
  geometry: GeoJsonGeometry
  properties: any
}

class GeoJsonPointFeature implements GeoJsonFeature {
  readonly type: string = 'Feature';
  readonly geometry: GeoJsonPointGeometry;
  readonly properties: any;

  constructor (geometry: GeoJsonPointGeometry, properties: any) {
    this.geometry = geometry
    this.properties = properties
  }
}

class ShopGeoJson {
  readonly type: string = 'FeatureCollection';
  features: Array<GeoJsonFeature> = [];

  constructor (shops: Array<Shop>) {
    this.features = shops
      .filter(shop => (typeof shop.lat === 'number') && (typeof shop.lng === 'number'))
      .map((shop) => {
        const geoJsonPointGeometry = new GeoJsonPointGeometry(shop.lat, shop.lng)
        return new GeoJsonPointFeature(geoJsonPointGeometry, shop)
      })
  }
}

export default ShopGeoJson
