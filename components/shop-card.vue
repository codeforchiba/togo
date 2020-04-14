<template>
  <v-card :width="cardWidth" class="ma-4">
    <v-img :src="coverImagePath" height="300px" />
    <v-card-title>{{ shop.name }}</v-card-title>
    <v-card-text>
      <p>営業時間: 10:00 〜 20:00</p>
      <p>{{ shop.address }}</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn icon>
        <v-icon>fas fa-globe</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>fab fa-facebook</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>fab fa-instagram</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>fab fa-line</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>fab fa-twitter</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import Shop from '~/models/shop'

@Component
export default class ShopCard extends Vue {
  @Prop({ required: true })
  shop!: Shop

  get coverImagePath () {
    return `${this.shop.coverImagePath}`
  }

  get cardWidth () {
    return this.$vuetify.breakpoint.smAndDown ? 300 : 400
  }
}
</script>
