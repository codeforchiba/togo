<template>
  <v-row>
    <v-col cols="12" class="my-5 display-1 text-center font-weight-bold">
      <p><span class="pink-line">{{ name }}エリア</span></p>
    </v-col>
    <v-col cols="12" class="px-0">
      <v-slide-group :show-arrows="showArrows">
        <v-slide-item v-for="shop in shops" :key="shop.name">
          <shop-card :shop="shop" :mini="true" />
        </v-slide-item>
      </v-slide-group>
    </v-col>
    <v-col class="text-center">
      <v-btn tile x-large color="red accent-2 white--text font-weight-bold" :to="areaPagePath">
        {{ name }}エリアの店舗一覧
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import Area from '~/models/area'
import Shop from '~/models/shop'
import { areaStore } from '~/store'
import ShopCard from '~/components/shop-card.vue'

@Component({
  components: { ShopCard }
})
export default class AreaRow extends Vue {
  @Prop({ required: true })
  code!: string

  @Prop({ required: true })
  shops!: Shop[]

  get area () {
    return areaStore.areas.find(a => a.id === this.code) || new Area()
  }

  get name () {
    return this.area.name || ''
  }

  get areaPagePath () {
    return `/${this.area.id}`
  }

  get showArrows () {
    return this.$vuetify.breakpoint.mdAndUp
  }
}
</script>
