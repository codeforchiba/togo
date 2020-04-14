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
import { Record, FieldSet, Attachment } from 'airtable'

import AreaRow from '~/components/area-row.vue'
import Shop from '~/models/shop'
import ShopCard from '~/components/shop-card.vue'

const retrieve = async function (context: Context, area: string): Promise<ReadonlyArray<Shop>> {
  // @ts-ignore
  const records = await context.$dataApi(area).select({ maxRecords: 5 }).all()
  return records.map((record: Record<FieldSet>) => toShop(record))
}

const toShop = function (record: Record<FieldSet>): Shop {
  return new Shop({
    id: record.id,
    name: record.fields.Name as string,
    address: record.fields.Address as string,
    coverImagePath: (record.fields['Cover Image'] as ReadonlyArray<Attachment>)[0].url
  })
}

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
    const kemigawahama = await retrieve(context, '検見川浜')
    const kaihinmakuhari = await retrieve(context, '海浜幕張')
    const inagekaigan = await retrieve(context, '稲毛海岸')

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
