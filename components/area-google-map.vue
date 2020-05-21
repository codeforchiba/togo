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
import getCenter from 'geolib/es/getCenter'
import { GeolibInputCoordinates } from 'geolib/es/types'
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

  get center () {
    const poins = this.area.shops.map((shop) => {
      return { latitude: shop.lat, longitude: shop.lng } as GeolibInputCoordinates
    })
    const centerPoint = getCenter(poins)
    return { lat: centerPoint.latitude, lng: centerPoint.longitude }
  }

  initializeMap () {
    const loader = new Loader({
      apiKey: this.apiKey
    }as LoaderOptions)

    console.log(this.center)
    const mapOptions = {
      center: this.center,
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
