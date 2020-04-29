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
  features: ReadonlyArray<GeoJsonFeature> = [];

  constructor (shops: ReadonlyArray<Shop>) {
    this.features = shops
      .filter(shop => (typeof shop.lat === 'number') && (typeof shop.lng === 'number'))
      .map((shop) => {
        // TODO: shop.lat shop.lng の型変換 or null ガード
        // shopのほうがoptional型
        // filterでガードしても型チェックで引っかかる。
        // filterでガードして 非optional型にcastする?
        const geoJsonPointGeometry = new GeoJsonPointGeometry(1, 1)
        return new GeoJsonPointFeature(geoJsonPointGeometry, shop)
      })
  }
}

export default ShopGeoJson
