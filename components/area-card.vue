<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ name }}エリア</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-img :src="coverImage" :height="imageHeight">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0 blue-grey lighten-4" justify="center" align="center">
          <v-icon x-large>fas fa-shopping-bag</v-icon>
        </v-row>
      </template>
      <v-row align="end" class="fill-height">
        <v-col class="py-0 frosted-glass text-center">
          <v-card-title>{{ shopName }}</v-card-title>
        </v-col>
      </v-row>
    </v-img>
    <v-card-actions>
      <v-spacer />
      <v-btn tile large color="red accent-2 white--text font-weight-bold" :to="areaPagePath">
        店舗一覧
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { sample } from 'lodash'

import Area from '~/models/area'
import ShopCard from '~/components/shop-card.vue'

@Component({
  components: { ShopCard }
})
export default class AreaRow extends Vue {
  @Prop({ required: true })
  area!: Area

  get name () {
    return this.area.name || ''
  }

  get shop () {
    return sample(this.area.shops)!
  }

  get shopName () {
    return this.shop.name
  }

  get coverImage () {
    return this.shop.coverImagePath
  }

  get imageHeight () {
    return this.$vuetify.breakpoint.smAndDown ? 400 : 300
  }

  get areaPagePath () {
    return `/${this.area.id}`
  }
}
</script>

<style scoped>
.frosted-glass {
  background-color: rgba(255, 255, 255, .35);
  backdrop-filter: blur(5px);
}
</style>
