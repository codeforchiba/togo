<template>
  <div>
    <v-row>
      <v-col cols="12" class="my-5">
        <h1>
          <v-img :src="logoPath" alt="お家で食べよう" />
        </h1>
      </v-col>
      <v-col cols="12" class="my-5 display-1 text-center font-weight-bold">
        <p><span class="pink-line">検見川浜エリア</span></p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'

import ShopCard from '~/components/shop-card.vue'

@Component({
  components: { ShopCard }
})
export default class Index extends Vue {
  get logoPath () {
    return require('~/assets/images/logo.jpg')
  }
}
</script>
