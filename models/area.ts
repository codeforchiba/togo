import Shop from './shop'

export default class Area {
  readonly id: string = ''
  readonly name: string = ''
  shops: Array<Shop> = []

  constructor (object?: Partial<Area>) {
    Object.assign(this, object)
  }
}
