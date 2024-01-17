<template>
  <div :class="[inEditMode ? 'sticky top-0' : '', 'z-10 m-2 bg-white']">
    <div class="drop-shadow-md rounded-b-lg">
      <div class="p-4 flex">
        <div class="flex-grow">
          <div class="flex">
            <AddLayout v-if="inEditMode" />
          </div>
        </div>
        <div class="flex justify-end">
          <SelectWidgetLayout />
          <EditWidgetsPage v-model="inEditMode"></EditWidgetsPage>
        </div>
      </div>
      <div class="bg-white px-4 pb-2">
        <AddWidget v-if="inEditMode"></AddWidget>
      </div>
    </div>
  </div>
  <div class="">
    <template v-if="layoutManager.currentLayout">
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
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
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
