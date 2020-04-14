export default class Area {
  readonly id?: string;
  readonly name?: string;

  constructor (object?: Partial<Area>) {
    Object.assign(this, object)
  }
}
