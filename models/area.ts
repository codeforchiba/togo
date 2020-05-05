import Shop from './shop'

export default class Area {
  readonly id: string = ''
  readonly name: string = ''
  readonly shops: ReadonlyArray<Shop> = []
  readonly zoom: number = 14
  readonly lat: number = 35.648976
  readonly lng: number = 140.043184

  constructor (object?: Partial<Area>) {
    Object.assign(this, object)
  }
}
