<template>
  <div>
    <v-dialog v-model="open" :width="cardWidth" :fullscreen="mobile">
      <template v-slot:activator="{ on }">
        <v-btn text color="blue accent-2" v-on="on">
          詳細
        </v-btn>
      </template>
      <v-card>
        <v-img :src="coverImagePath" height="300px">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0 blue-grey lighten-4" justify="center" align="center">
              <v-icon x-large>fas fa-shopping-bag</v-icon>
            </v-row>
          </template>
        </v-img>
        <v-card-title>{{ name }}</v-card-title>
        <v-list-item v-if="businessHours">
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
        <v-list-item v-if="menu">
          <v-list-item-icon>
            <v-icon>fas fa-bars</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="menu" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="notes">
          <v-list-item-icon>
            <v-icon>fas fa-comment-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="notes" />
          </v-list-item-content>
        </v-list-item>
        <v-row dense class="ma-3">
          <v-col v-for="(picture, i) in pictures" :key="i" cols="6">
            <v-card @click="openImageDialog(picture)">
              <v-img :src="picture" :aspect-ratio="1" />
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn text color="blue accent-2" @click="open = false">
            閉じる
          </v-btn>
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
    </v-dialog>
    <v-dialog v-model="openImage" :fullscreen="mobile" :max-width="imageWidth">
      <v-card :max-width="imageWidth">
        <v-img :src="currentSource" contain :max-width="imageWidth" />
        <v-card-actions>
          <v-spacer />
          <v-btn text color="blue accent-2" @click="openImage = false">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'

import Shop from '~/models/shop'

@Component
export default class ShopDialog extends Vue {
  @Prop({ required: true })
  shop!: Shop

  open: boolean = false

  openImage: boolean = false

  currentSource: string = ''

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

  get notes () {
    return this.nl2br(this.shop.notes)
  }

  get menu () {
    return this.nl2br(this.shop.menus)
  }

  get coverImagePath () {
    return this.shop.coverImagePath
  }

  get pictures () {
    return this.shop.pictures
  }

  get cardWidth () {
    return this.mobile ? undefined : 600
  }

  get imageWidth () {
    return this.mobile ? undefined : 1000
  }

  get mobile () {
    return this.$vuetify.breakpoint.xsOnly
  }

  openImageDialog (source: string) {
    this.currentSource = source
    this.openImage = true
  }

  nl2br (content: string | undefined) {
    return content ? content.replace(/\n/g, '<br/>') : undefined
  }
}
</script>
