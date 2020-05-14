<template>
  <client-only>
    <div id="map" style="height: 25rem;background-color: #7F828B;color: white">
      Google Map
    </div>
  </client-only>
</template>
<script lang="ts">
import Vue from 'vue'
import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'
import { Component, Prop } from 'nuxt-property-decorator'
import ShopGeoJson from '~/models/shop-geo-json'
import Area from '~/models/area'

@Component
export default class AreaGoogleMap extends Vue {
  @Prop({ required: true }) readonly area!: Area
  @Prop({ required: true }) readonly apiKey!: String

  mounted () {
    this.$nextTick(() => {
      this.initializeMap()
    })
  }

  get geoJson (): ShopGeoJson {
    return new ShopGeoJson(this.area.shops)
  }

  initializeMap () {
    const loader = new Loader({
      apiKey: this.apiKey
    }as LoaderOptions)

    const mapOptions = {
      center: { lat: this.area.lat, lng: this.area.lng },
      zoom: this.area.zoom
    }

    loader.load()
      .then(() => {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        const googleMap = new google.maps.Map(document.getElementById('map'), mapOptions)
        googleMap.data.addGeoJson(this.geoJson)
        // TODO: クリックイベントで詳細のModalを表示
      })
  }
}
</script>
