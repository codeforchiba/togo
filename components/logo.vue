<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6" class="my-5" tag="h1">
      <v-img :src="logoPath" alt="お家で食べよう" />
    </v-col>
    <v-col cols="12" class="text-center headline">
      <p>サービス終了のお知らせ</p>
    </v-col>
    <v-col cols="12" class="text-left text-md-center">
      <p>2020年4月より運営してまいりました「おうちで食べようin千葉」ですが、サービスの利用状況を鑑みて、2021年1月31日（日）をもちまして、サービスを終了させていただくこととなりました。</p>
      <p>いままで「おうちで食べようin千葉」をご利用いただき、誠にありがとうございます。引き続き、code for chibaのサービスを利用いただけますことを心よりお待ち申し上げます。</p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'

@Component
export default class Logo extends Vue {
  get logoPath () {
    return require('~/assets/images/logo.jpg')
  }
}
</script>
