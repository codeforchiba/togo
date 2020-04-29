<template>
  <v-app>
    <v-content>
      <nuxt />
    </v-content>
    <footer-information />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import FooterInformation from '~/components/footer.vue'

@Component({
  components: { FooterInformation }
})
export default class Default extends Vue {
  head () {
    const fullPath = `${process.env.baseUrl}${this.$route.fullPath}`

    return {
      link: [{ rel: 'canonical', href: fullPath }],
      meta: [{ hid: 'og:url', property: 'og:url', content: fullPath }]
    }
  }
}
</script>
