<template>
  <div style="height: 25rem;background-color: #7F828B;color: white" :data-aaa="geoJson">
    Google Map
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import Shop from '~/models/shop'
import ShopGeoJson from '~/models/shop-geo-json'

@Component
export default class AreaGoogleMap extends Vue {
  @Prop({ required: true }) readonly shops!: ReadonlyArray<Shop>

  get geoJson (): ShopGeoJson {
    return new ShopGeoJson(this.shops)
  }
}
</script>
