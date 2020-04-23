import { Module, VuexModule } from 'vuex-module-decorators'

import Area from '~/models/area'

@Module({
  namespaced: true,
  stateFactory: true,
  name: 'area'
})
export default class AreaModule extends VuexModule {
  areas: ReadonlyArray<Area> = [
    new Area({ id: 'kaihinmakuhari', name: '海浜幕張' }),
    new Area({ id: 'kemigawahama', name: '検見川浜' }),
    new Area({ id: 'kemigawa', name: '検見川' }),
    new Area({ id: 'inagekaigan', name: '稲毛海岸' }),
    new Area({ id: 'chibaminato', name: '千葉みなと' }),
    new Area({ id: 'nishichiba', name: '西千葉' }),
    new Area({ id: 'chiba', name: '千葉' })
  ]
}
