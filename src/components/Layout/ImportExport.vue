<template>
  <PVDialog
    :visible="open"
    @update:visible="updateOpen"
    modal
    header="Import/Export Layouts"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <PVTabView>
      <PVTabPanel header="Import">
        <ImportLayout></ImportLayout>
      </PVTabPanel>
      <PVTabPanel header="Export">
        <ExportLayout></ExportLayout>
      </PVTabPanel>
    </PVTabView>
  </PVDialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

// Prime Vue
import PVDialog from 'primevue/dialog'
import PVTabView from 'primevue/tabview'
import PVTabPanel from 'primevue/tabpanel'

// Our Components
import ImportLayout from './Import.vue'
import ExportLayout from './Export.vue'

export default defineComponent({
  name: 'LayoutDialog',
  components: {
    PVDialog,
    PVTabView,
    PVTabPanel,

    ImportLayout,
    ExportLayout
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
