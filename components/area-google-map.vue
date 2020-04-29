<template>
  <div style="height: 25rem;background-color: #7F828B;color: white">
    Google Map
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop } from 'nuxt-property-decorator'
import Shop from '~/models/shop'
import ShopGeoJson from '~/models/shop-geo-json'

export default class AreaGoogleMap extends Vue {
  @Prop({ required: true })
  shops!: ReadonlyArray<Shop>

  get geoJson () {
    return new ShopGeoJson(this.shops)
  }
}
</script>
