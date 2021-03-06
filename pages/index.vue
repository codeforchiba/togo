<template>
  <v-container fluid>
    <logo />
    <v-row class="mt-5 pb-5" justify="center">
      <v-col cols="12" class="my-5 headline text-center font-weight-bold" tag="h2">
        <p>サービス終了のお知らせ</p>
      </v-col>
      <v-col cols="12" sm="12" md="10" class="text-left">
        <p>
          2020年4月より運営してまいりました「おうちで食べようin千葉」ですが、サービスの利用状況を鑑みて、2021年1月31日（日）をもちまして、サービスを終了させていただくこととなりました。
        </p>
        <p>
          いままで「おうちで食べようin千葉」をご利用いただき、誠にありがとうございます。引き続き、NPO法人 Code for Chibaのサービスを利用いただけますことを心よりお待ち申し上げます。
        </p>
      </v-col>
    </v-row>
    <client-only>
      <v-row class="mt-5 pb-5" justify="center">
        <v-col v-for="a in records" :key="a.id" cols="12" sm="6" md="5" class="mb-5">
          <area-card :area="a" />
        </v-col>
      </v-row>
    </client-only>
    <v-row class="mt-5 pb-5 red lighten-5">
      <v-col cols="12" class="my-5 headline text-center font-weight-bold" tag="h2">
        当サイトについて
      </v-col>
      <v-col cols="12" class="text-left text-md-center">
        <p>
          テイクアウトに対応しているお店を知ることができるサイトです。営業時間やメニューもテイクアウトに対応しているものを掲載するようにしております。
        </p>
        <p>
          お店の情報はエリアごとに分けて掲載しております。是非、お近くのお店にて購入し、お家でお楽しみください。
        </p>
      </v-col>
    </v-row>
    <v-row class="pb-5 red lighten-4">
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
        <v-btn tile x-large color="red accent-2 white--text font-weight-bold" :href="shopFormUrl" target="_blank">
          掲載依頼フォームを開く
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="pb-5 red lighten-5">
      <v-col cols="12" class="my-5 headline text-center font-weight-bold" tag="h2">
        地域の皆様へ
      </v-col>
      <v-col cols="12" class="text-left text-md-center">
        <p>
          地域でがんばっているお店の情報をご提供ください。日々変わる状況の中、情報の告知等に苦労されているかと思います。是非、ご近所のお店の情報を共有ください。
        </p>
        <p>
          入力いただいた情報は、内容確認後、順次掲載させていただきます。
        </p>
      </v-col>
      <v-col class="text-center py-5">
        <v-btn tile x-large color="red accent-2 white--text font-weight-bold" :href="requestFormUrl" target="_blank">
          お店情報提供フォームを開く
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
    <v-row class="mt-5">
      <v-col cols="12" class="my-5 headline text-center font-weight-bold" tag="h2">
        千葉市の飲食店応援プロジェクト
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <a href="https://chiba1000samurai.com/" target="_blank">
            <v-img :src="samuraiPath" :max-width="small ? 320 : 500" />
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
import Area from '~/models/area'
import AreaCard from '~/components/area-card.vue'
import Logo from '~/components/logo.vue'
import ShopCard from '~/components/shop-card.vue'

import areaData from '~/data/shop.json'

@Component({
  components: { AreaCard, Logo, ShopCard }
})
export default class Index extends Vue {
  records!: Array<Area>

  title: string = 'お家で食べよう in 千葉 powered by Code for Chiba'

  shopFormUrl: string = 'https://forms.gle/uQ5q8ecqPohBUkqu5'

  requestFormUrl: string = 'https://forms.gle/11DFHppJfQNFwshs6'

  get cfcLogoPath () {
    return require('~/assets/images/cfc-with-text.png')
  }

  get midoridaiPath () {
    return require('~/assets/images/midoridai.png')
  }

  get samuraiPath () {
    return require('~/assets/images/1000samurai.jpg')
  }

  get small () {
    return this.$vuetify.breakpoint.smAndDown
  }

  async asyncData (context: Context): Promise<object> {
    if (context.isDev) {
      const areas = areaStore.areas
      const records: Array<Area> = []

      for (const a of areas) {
        const shops = await context.app.$dataApi.retrieve(a.name)
        records.push({ id: a.id, name: a.name, shops })
      }

      return { records }
    } else {
      return { records: areaData }
    }
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
