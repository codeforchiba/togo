<template>
  <div>
    <v-row>
      <v-col cols="12" class="my-5">
        <h1>
          <v-img :src="logoPath" alt="お家で食べよう" />
        </h1>
      </v-col>
      <v-col cols="12" class="my-5 display-1 text-center font-weight-bold">
        <p><span class="pink-line">{{ name }}エリア</span></p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="shop in shops" :key="shop.name" cols="12" sm="4">
        <shop-card :shop="shop" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn tile x-large color="red accent-2 white--text font-weight-bold" to="/">
          トップページに戻る
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import Vue from 'vue'

import { areaStore } from '~/store'
import Area from '~/models/area'
import Shop from '~/models/shop'
import ShopCard from '~/components/shop-card.vue'

@Component({
  components: { ShopCard }
})
export default class Index extends Vue {
  area!: Area
  shops!: ReadonlyArray<Shop>

  get logoPath () {
    return require('~/assets/images/logo.jpg')
  }

  get name () {
    return this.area.name
  }

  async asyncData (context: Context): Promise<object> {
    const areaCode = context.params.area
    const area = areaStore.areas.find(a => a.id === areaCode)

    // @ts-ignore
    const shops = await context.$dataApi.retrieve(area.name)

    return { area, shops }
  }
}
</script>
