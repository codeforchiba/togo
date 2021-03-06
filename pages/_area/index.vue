<template>
  <v-container>
    <logo />
    <v-row>
      <v-col cols="12" class="my-5 display-2 text-center font-weight-bold" tag="h1">
        <span class="pink-line">{{ name }}エリア</span>
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
  </v-container>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import Vue from 'vue'
import { sortBy } from 'lodash'

import { areaStore } from '~/store'
import Area from '~/models/area'
import Logo from '~/components/logo.vue'
import ShopCard from '~/components/shop-card.vue'

import areaData from '~/data/shop.json'

@Component({
  components: { Logo, ShopCard }
})
export default class Index extends Vue {
  area!: Area

  get name () {
    return this.area.name
  }

  get shops () {
    return sortBy(this.area.shops, s => s.official)
  }

  async asyncData (context: Context): Promise<object> {
    const areaCode = context.params.area

    if (context.isDev) {
      const areaData = areaStore.areas.find(a => a.id === areaCode)

      // @ts-ignore
      const shops = await context.app.$dataApi.retrieve(areaData.name)
      const area: Area = { id: areaData!.id, name: areaData!.name, shops }

      return { area }
    } else {
      const area = areaData.find(a => a.id === areaCode)
      return { area }
    }
  }

  head () {
    return {
      title: this.name,
      meta: [
        { hid: 'og:title', property: 'og:title', content: `お家で食べよう in ${this.name} powered by Code for Chiba` },
        { hid: 'og:image', property: 'og:image', content: `${process.env.baseUrl}/ogp_${this.area.id}.jpg` }
      ]
    }
  }
}
</script>
