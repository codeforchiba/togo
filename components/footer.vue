<template>
  <v-footer padless>
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12" class="pa-0">
          <v-card flat tile class="red lighten-4 py-5">
            <v-card-text class="white--text">
              <v-row justify="center">
                <v-img :src="logoPath" max-width="60" alt="NPO法人Code for Chiba" />
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'

@Component
export default class Footer extends Vue {
  get logoPath () {
    return require('~/assets/images/cfc.png')
  }
}

</script>
