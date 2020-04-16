<template>
  <v-card :width="cardWidth" class="ma-4">
    <v-img :src="coverImagePath" height="300px">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0 blue-grey lighten-4" justify="center" align="center">
          <v-icon x-large>fas fa-shopping-bag</v-icon>
        </v-row>
      </template>
    </v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-list-item v-if="!mini && businessHours">
      <v-list-item-icon>
        <v-icon>fas fa-clock</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="businessHours" />
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>fas fa-map-marker</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <p>{{ address }}</p>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="phone">
      <v-list-item-icon>
        <v-icon>fas fa-phone</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <p>{{ phone }}</p>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <shop-dialog :shop="shop" />
      <v-spacer />
      <v-btn v-if="url" icon :href="url" target="_blank">
        <v-icon>fas fa-globe</v-icon>
      </v-btn>
      <v-btn v-if="facebook" icon :href="facebook" target="_blank">
        <v-icon>fab fa-facebook</v-icon>
      </v-btn>
      <v-btn v-if="twitter" icon :href="twitter" target="_blank">
        <v-icon>fab fa-twitter</v-icon>
      </v-btn>
      <v-btn v-if="instagram" icon :href="instagram" target="_blank">
        <v-icon>fab fa-instagram</v-icon>
      </v-btn>
      <v-btn v-if="line" icon>
        <v-icon>fab fa-line</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import Shop from '~/models/shop'
import ShopDialog from '~/components/shop-dialog.vue'

@Component({
  components: { ShopDialog }
})
export default class ShopCard extends Vue {
  @Prop({ required: true })
  shop!: Shop

  @Prop({ default: false })
  mini!: boolean

  get name () {
    return this.shop.name
  }

  get address () {
    return this.shop.address
  }

  get businessHours () {
    return this.nl2br(this.shop.businessHours)
  }

  get phone () {
    return this.shop.phone
  }

  get url () {
    return this.shop.url
  }

  get facebook () {
    return this.shop.facebook ? `https://facebook.com/${this.shop.facebook}` : undefined
  }

  get twitter () {
    return this.shop.twitter ? `https://twitter.com/${this.shop.twitter}` : undefined
  }

  get instagram () {
    return this.shop.instagram ? `https://www.instagram.com/${this.shop.instagram}` : undefined
  }

  get line () {
    return this.shop.line
  }

  get coverImagePath () {
    return this.shop.coverImagePath
  }

  get cardWidth () {
    if (this.mini) {
      return this.$vuetify.breakpoint.smAndDown ? 300 : 400
    } else {
      return this.$vuetify.breakpoint.smAndDown ? undefined : 400
    }
  }

  nl2br (content: string | undefined) {
    return content ? content.replace(/\n/g, '<br/>') : undefined
  }
}
</script>

<style>
.v-list-item__content p {
  padding: 6px 0;
  margin: 0;
}
</style>
