<template>
  <v-container fluid>
    <logo />
    <client-only>
      <area-row v-for="a in areas" :key="a.id" :code="a.id" :shops="records[a.id]" />
    </client-only>
    <v-row class="mt-5 pb-5 red lighten-5">
      <v-col cols="12" class="my-5 headline text-center font-weight-bold" tag="h2">
        掲載を希望する飲食店の皆様へ
      </v-col>
      <v-col cols="12" class="text-left text-md-center">
        <p>
          掲載依頼は、フォームより受け付けております。以下のボタンよりフォームを開き、入力をお願いします(要Google アカウント)。
        </p>
        <p>
          入力いただいた情報は、内容確認後、順次掲載させていただきます。
        </p>
      </v-col>
      <v-col class="text-center py-5">
        <v-btn tile x-large color="red accent-2 white--text font-weight-bold" :href="formUrl" target="_blank">
          掲載依頼フォームを開く
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="12" class="my-5 headline text-center font-weight-bold" tag="h2">
        運営団体
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <a href="http://www.code4chiba.org/" target="_blank">
            <v-img :src="cfcLogoPath" :max-width="small ? 200 : 300" />
          </a>
        </v-row>
      </v-col>
      <v-col cols="12" class="my-5 headline text-center font-weight-bold" tag="h2">
        情報協力
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <a href="https://www.facebook.com/midoridaipantry" target="_blank">
            <v-img :src="midoridaiPath" :max-width="160" />
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Component } from 'nuxt-property-decorator'

import { areaStore } from '~/store'
import AreaRow from '~/components/area-row.vue'
import Logo from '~/components/logo.vue'
import Shop from '~/models/shop'
import ShopCard from '~/components/shop-card.vue'

interface RecordMap {
  kemigawahama: ReadonlyArray<Shop>
  kaihinmakuhari: ReadonlyArray<Shop>
  inagekaigan: ReadonlyArray<Shop>
  nishichiba: ReadonlyArray<Shop>
  chibaminato: ReadonlyArray<Shop>
  chiba: ReadonlyArray<Shop>
}

@Component({
  components: { AreaRow, Logo, ShopCard }
})
export default class Index extends Vue {
  records!: RecordMap

  title: string = 'お家で食べよう in 千葉 powered by Code for Chiba'

  formUrl: string = 'https://forms.gle/uQ5q8ecqPohBUkqu5'

  get cfcLogoPath () {
    return require('~/assets/images/cfc-with-text.png')
  }

  get midoridaiPath () {
    return require('~/assets/images/midoridai.png')
  }

  get small () {
    return this.$vuetify.breakpoint.smAndDown
  }

  get areas () {
    return areaStore.areas
  }

  async asyncData (context: Context): Promise<object> {
    // @ts-ignore
    const kemigawahama = await context.$dataApi.retrieve('検見川浜', { maxRecords: 5 })
    // @ts-ignore
    const kaihinmakuhari = await context.$dataApi.retrieve('海浜幕張', { maxRecords: 5 })
    // @ts-ignore
    const inagekaigan = await context.$dataApi.retrieve('稲毛海岸', { maxRecords: 5 })
    // @ts-ignore
    const nishichiba = await context.$dataApi.retrieve('西千葉', { maxRecords: 5 })
    // @ts-ignore
    const chibaminato = await context.$dataApi.retrieve('千葉みなと', { maxRecords: 5 })
    // @ts-ignore
    const chiba = await context.$dataApi.retrieve('千葉', { maxRecords: 5 })

    return { records: { kemigawahama, kaihinmakuhari, inagekaigan, nishichiba, chibaminato, chiba } }
  }

  head () {
    return {
      titleTemplate: null,
      title: this.title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.title }
      ]
    }
  }
}
</script>

<style>
.pink-line {
  background: linear-gradient(transparent 74%, rgba(172, 58, 89, 0.6) 0%);
  letter-spacing: 2px;
}
</style>
