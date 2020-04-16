<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6" class="my-5" tag="h1">
      <v-img :src="logoPath" alt="お家で食べよう" />
    </v-col>
    <v-col cols="12" class="text-center">
      <p>近所のお店で買って、お家で食べよう。</p>
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
