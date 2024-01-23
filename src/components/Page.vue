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
  <div class="" v-if="currentLayout">
    <WidgetsGrid
      :layout="currentLayout.grid"
      :inEditMode="inEditMode"
      :page-content="pageContent"
      @layout-updated="gridUpdated"
    ></WidgetsGrid>
    <WidgetsTabs
      v-if="currentLayout.hasTabs && currentLayout.tabs.length > 0"
      :tabs="currentLayout.tabs"
      :inEditMode="inEditMode"
      :page-content="pageContent"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// PrimeVue
import PVToolbar from 'primevue/toolbar'
import PVCard from 'primevue/card'

// Out Components
import EditWidgetsPage from './Page/Edit.vue'
import SelectWidgetLayout from './Layout/Select.vue'
import AddLayout from './Layout/Add.vue'
import WidgetDock from './Widgets/Add.vue'
import type { LayoutPage, LayoutManager, LayoutWidget } from '@/types'

export default defineComponent({
  name: 'WidgetsPage',
  components: {
    PVToolbar,
    PVCard,

    AddLayout,
    EditWidgetsPage,
    SelectWidgetLayout,
    WidgetDock
  },
  props: {
    page: {
      type: String,
      default: 'index'
    },
    defaultLayouts: {
      type: Array as () => LayoutPage[],
      required: true
    },
    pageContent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  inject: {
    layoutManager: {
      from: '$widgetLayoutManager'
    }
  },
  computed: {
    currentLayout() {
      return (this.layoutManager as LayoutManager).currentLayout;
    }
  },
  data() {
    return {
      inEditMode: false
    }
  },
  mounted(){
    (this.layoutManager as LayoutManager).setPage(this.page, this.defaultLayouts);
  },
  methods: {
    gridUpdated(input: LayoutWidget[]) {
      (this.layoutManager as LayoutManager).updateGrid(input, (this.layoutManager as LayoutManager).currentLayout.grid.id);
    }
  }
})
</script>