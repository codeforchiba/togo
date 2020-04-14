import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Area from '~/store/area'

// eslint-disable-next-line import/no-mutable-exports
let areaStore: Area

function initialiseStores (store: Store<any>): void {
  areaStore = getModule(Area, store)
}

export { initialiseStores, areaStore }
