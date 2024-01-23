<template>
    <PVCard
      :pt="{
        root: 'sticky top-0 z-10',
        body: 'p-0',
        content: 'mx-0'
      }"
      v-if="inEditMode"
    >
      <template #content>
        <WidgetDock></WidgetDock>
      </template>
    </PVCard>
  <div :class="[inEditMode ? 'sticky top-0' : '', 'z-10 flex justify-end']">
    <div class="space-x-2">
      <SelectWidgetLayout />
      <EditWidgetsPage v-model:editMode="inEditMode"></EditWidgetsPage>
    </div>
  </div>
  <div class="" v-if="layoutManager.currentLayout">
    <WidgetsGrid
      :layout="layoutManager.currentLayout.grid"
      :inEditMode="inEditMode"
      @layout-updated="gridUpdated"
    ></WidgetsGrid>
    <WidgetsTabs
      v-if="layoutManager.currentLayout.hasTabs && layoutManager.currentLayout.tabs.length > 0"
      :tabs="layoutManager.currentLayout.tabs"
      :inEditMode="inEditMode"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'

// PrimeVue
import PVToolbar from 'primevue/toolbar';
import PVCard from 'primevue/card';

import EditWidgetsPage from './Page/Edit.vue'
import SelectWidgetLayout from './Layout/Select.vue'
import AddLayout from './Layout/Add.vue'
import WidgetDock from './Widgets/Add.vue'
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
    PVCard,
    AddLayout,
    EditWidgetsPage,
    SelectWidgetLayout,
    WidgetDock
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
