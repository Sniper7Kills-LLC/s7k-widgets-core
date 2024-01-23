<template>
  <PVDialog
    :visible="open"
    @update:visible="updateOpen"
    modal
    header="Import/Export Layouts"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <ImportWidget></ImportWidget>
  </PVDialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

// Prime Vue
import PVDialog from 'primevue/dialog'

// Our Components
import ImportWidget from './Import.vue'

export default defineComponent({
  name: 'LayoutDialog',
  components: {
    PVDialog,

    ImportWidget
  },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:open'],
  methods: {
    updateOpen() {
      this.$emit('update:open', !this.open)
    }
  }
})
</script>
