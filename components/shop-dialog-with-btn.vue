<template>
  <div>
    <v-btn text color="blue accent-2" @click.stop="open = true">
      詳細
    </v-btn>
    <ShopDialog
      :shop="shop"
      :open.sync="open"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'

import Shop from '~/models/shop'
import ShopDialog from '~/components/shop-dialog.vue'

@Component({
  components: { ShopDialog }
})
export default class ShopDialogWithBtn extends Vue {
  @Prop({ required: true })
  shop!: Shop

  open: boolean = false
}
</script>
