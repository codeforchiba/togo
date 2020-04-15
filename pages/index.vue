<template>
  <div>
    <v-row>
      <v-col cols="12" class="my-5">
        <v-img :src="logoPath" alt="お家で食べよう" />
      </v-col>
      <v-col cols="12" class="text-center">
        <p>近所のお店で買って、お家で食べよう。</p>
      </v-col>
    </v-row>
    <client-only>
      <area-row code="kemigawahama" :shops="records.kemigawahama" />
      <area-row code="kaihinmakuhari" :shops="records.kaihinmakuhari" />
      <area-row code="inagekaigan" :shops="records.inagekaigan" />
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Component } from 'nuxt-property-decorator'

import AreaRow from '~/components/area-row.vue'
import Shop from '~/models/shop'
import ShopCard from '~/components/shop-card.vue'

interface RecordMap {
  kemigawahama: ReadonlyArray<Shop>
  kaihinmakuhari: ReadonlyArray<Shop>
  inagekaigan: ReadonlyArray<Shop>
}

@Component({
  components: { ShopCard, AreaRow }
})
export default class Index extends Vue {
  records!: RecordMap

  get logoPath () {
    return require('~/assets/images/logo.jpg')
  }

  async asyncData (context: Context): Promise<object> {
    // @ts-ignore
    const kemigawahama = await context.$dataApi.retrieve('検見川浜', { maxRecords: 5 })
    // @ts-ignore
    const kaihinmakuhari = await context.$dataApi.retrieve('海浜幕張', { maxRecords: 5 })
    // @ts-ignore
    const inagekaigan = await context.$dataApi.retrieve('稲毛海岸', { maxRecords: 5 })

    return { records: { kemigawahama, kaihinmakuhari, inagekaigan } }
  }
}
</script>

<style>
.pink-line {
  background: linear-gradient(transparent 74%, rgba(172, 58, 89, 0.6) 0%);
  letter-spacing: 2px;
}
</style>
