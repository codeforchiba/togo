<template>
  <div>
    <v-row>
      <v-col cols="12" class="my-5">
        <h1>
          <v-img :src="logoPath" alt="お家で食べよう" />
        </h1>
      </v-col>
      <v-col cols="12" class="text-center">
        <p>近所のお店で買って、お家で食べよう。</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="my-5 display-1 text-center font-weight-bold">
        <p><span class="pink-line">検見川浜エリア</span></p>
      </v-col>
      <v-col v-for="shop in kemigawahama" :key="shop.name" cols="12" sm="4">
        <shop-card :shop="shop" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="my-5 display-1 text-center font-weight-bold">
        <p><span class="pink-line">海浜幕張エリア</span></p>
      </v-col>
      <v-col v-for="shop in kaihinmakuhari" :key="shop.name" cols="12" sm="4">
        <shop-card :shop="shop" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Component } from 'nuxt-property-decorator'
import { Records, Record, FieldSet, Attachment } from 'airtable'

import Shop from '~/models/shop'
import ShopCard from '~/components/shop-card.vue'

const retrieve = async function (context: Context, area: string): Promise<Records<FieldSet>> {
  // @ts-ignore
  return await context.$dataApi(area).select().all()
}

interface RecordMap {
  kemigawahama: Records<FieldSet>
  kaihinmakuhari: Records<FieldSet>
}

@Component({
  components: { ShopCard }
})
export default class Index extends Vue {
  records!: RecordMap

  get logoPath () {
    return require('~/assets/images/logo.jpg')
  }

  get kemigawahama () {
    return this.records.kemigawahama.map((record: Record<FieldSet>) => this.toShop(record))
  }

  get kaihinmakuhari () {
    return this.records.kaihinmakuhari.map((record: Record<FieldSet>) => this.toShop(record))
  }

  async asyncData (context: Context): Promise<object> {
    const kemigawahama: Records<FieldSet> = await retrieve(context, '検見川浜')
    const kaihinmakuhari: Records<FieldSet> = await retrieve(context, '海浜幕張')

    return { records: { kemigawahama, kaihinmakuhari } }
  }

  toShop (record: Record<FieldSet>): Shop {
    return new Shop({
      id: record.id,
      name: record.fields.Name as string,
      coverImagePath: (record.fields['Cover Image'] as ReadonlyArray<Attachment>)[0].url
    })
  }
}
</script>

<style>
.pink-line {
  background: linear-gradient(transparent 74%, rgba(172, 58, 89, 0.6) 0%);
  letter-spacing: 2px;
}
</style>
