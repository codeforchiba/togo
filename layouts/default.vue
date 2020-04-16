<template>
  <v-app>
    <v-content>
      <nuxt />
    </v-content>
    <footer-information />
  </v-app>
</template>

<script lang="ts">
import FooterInformation from '~/components/footer.vue'

export default {
  components: {
    FooterInformation
  }
}
</script>
