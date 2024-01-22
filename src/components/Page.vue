<template>
  <div :class="[inEditMode ? 'sticky top-0' : '', 'z-10 flex justify-end']">
    <SelectWidgetLayout />
    <EditWidgetsPage v-model:editMode="inEditMode"></EditWidgetsPage>
  </div>
  <div class="" v-if="layoutManager.currentLayout">
    <WidgetsGrid
      :layout="layoutManager.currentLayout.grid"
      :inEditMode="inEditMode"
      @layout-updated="gridUpdated"
    ></WidgetsGrid>
    <WidgetsTabs
      v-if="layoutManager.currentLayout.hasTabs"
      :tabs="layoutManager.currentLayout.tabs"
      :inEditMode="inEditMode"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'

// PrimeVue
import PVToolbar from 'primevue/toolbar';

import EditWidgetsPage from './Page/Edit.vue'
import SelectWidgetLayout from './Layout/Select.vue'
import AddLayout from './Layout/Add.vue'
import AddWidget from './Widgets/Add.vue'
import type { LayoutPage, LayoutManager, LayoutWidget } from '@/types'

export default defineComponent({
  name: 'WidgetsPage',
  props: {
    page: {
      type: String,
      default: 'index'
    },
    defaultLayouts: {
      type: Array as () => LayoutPage[],
      required: true
    }
  },
  components: {
    PVToolbar,
    AddLayout,
    AddWidget,
    EditWidgetsPage,
    SelectWidgetLayout
  },
  setup(props) {
    const inEditMode = ref(false)

    const layoutManager = inject('$widgetLayoutManager') as LayoutManager

    // Fetch widgets on component mount
    onMounted(() => {
      if (layoutManager) {
        layoutManager.setPage(props.page, props.defaultLayouts)
      }
    })

    function gridUpdated(input: LayoutWidget[]) {
      layoutManager.updateGrid(input, layoutManager.currentLayout.grid.id)
    }

    return {
      inEditMode,
      gridUpdated,
      layoutManager
    }
  }
})
</script>

<style scoped>
/* Your styling for the grid display component */
</style>
