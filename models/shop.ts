export default class Shop {
  readonly id?: string
  readonly name?: string
  readonly coverImagePath?: string
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

  constructor (object?: Partial<Shop>) {
    Object.assign(this, object)
  }
}
