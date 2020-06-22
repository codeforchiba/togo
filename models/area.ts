import Shop from './shop'

export default class Area {
  readonly id: string = ''
  readonly name: string = ''
  readonly shops: ReadonlyArray<Shop> = []
  readonly zoom: number = 14

  constructor (object?: Partial<Area>) {
    Object.assign(this, object)
  }
}
