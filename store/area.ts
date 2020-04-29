import { Module, VuexModule } from 'vuex-module-decorators'

import Area from '~/models/area'
import AreaData from '~/data/area.json'

@Module({
  namespaced: true,
  stateFactory: true,
  name: 'area'
})
export default class AreaModule extends VuexModule {
  areas: ReadonlyArray<Area> = AreaData.map((a: Object) => { return new Area(a) })
}
