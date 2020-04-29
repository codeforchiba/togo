export default class Shop {
  readonly id?: string
  readonly name?: string
  readonly coverImagePath?: string
  readonly pictures?: ReadonlyArray<string>
  readonly address?: string
  readonly businessHours?: string
  readonly phone?: string
  readonly url?: string
  readonly facebook?: string
  readonly twitter?: string
  readonly instagram?: string
  readonly line?: string
  readonly menus?: string
  readonly notes?: string
  readonly lng?: number
  readonly lat?: number

  constructor (object?: Partial<Shop>) {
    Object.assign(this, object)
  }
}
