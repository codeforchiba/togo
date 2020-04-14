<template>
  <v-app>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
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
