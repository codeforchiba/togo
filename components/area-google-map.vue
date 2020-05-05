<template>
  <client-only>
    <div id="map" style="height: 25rem;background-color: #7F828B;color: white">
      Google Map
    </div>
  </client-only>
</template>
<script lang="ts">
import Vue from 'vue'
import { GoogleMap } from '@googlemaps/map-loader'
import { Component, Prop } from 'nuxt-property-decorator'
import { MapLoaderOptions } from '@googlemaps/map-loader/src/map-loader'
import Shop from '~/models/shop'
import ShopGeoJson from '~/models/shop-geo-json'

@Component
export default class AreaGoogleMap extends Vue {
  @Prop({ required: true }) readonly shops!: ReadonlyArray<Shop>
  @Prop({ required: true }) readonly apiKey!: String

  mounted () {
    this.initializeMap()
  }

  get geoJson (): ShopGeoJson {
    return new ShopGeoJson(this.shops)
  }

  initializeMap () {
    // TODO: centerをエリアごとに設定
    const mapOptions = {
      center: {
        lat: 35.648976,
        lng: 140.043184
      },
      zoom: 14
    } as google.maps.MapOptions

    const mapLoaderOptions = {
      apiKey: this.apiKey,
      divId: 'map',
      append: false,
      mapOptions
    } as MapLoaderOptions
    const mapLoader = new GoogleMap()
    mapLoader.initMap(mapLoaderOptions)
      .then((googleMap) => {
        // TODO: geojsonで投入したpointのアイコン
        // 表示
        // クリックイベント
        googleMap.data.addGeoJson(this.geoJson)
      })
  }
}
</script>
