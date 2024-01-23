<template>
  <PVTabMenu
    :model="tabMenu"
    :key="tabMenu.length"
    v-model:activeIndex="activeTab"
    :pt="{
      root: 'z-10',
      menuitem: 'flex-grow',
      action: 'justify-center',
      inkbar: 'hidden'
    }"
    :pt-options="{ mergeSections: true, mergeProps: true }"
  />
  <WidgetsGrid
    v-if="tabs[activeTab] && tabs[activeTab].grid"
    :layout="tabs[activeTab].grid"
    :inEditMode="inEditMode"
    :page-content="pageContent"
    @layout-updated="(layout: LayoutWidget[]) => gridUpdated(layout)"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

// Prime Vue
import PVTabMenu from 'primevue/tabmenu'

// Our Stuff
import WidgetsGrid from './Grid.vue'
import { LayoutManager, LayoutTab, LayoutWidget } from '@/types'

export default defineComponent({
  name: 'WidgetTabs',
  components: {
    PVTabMenu,

    WidgetsGrid
  },
  props: {
    tabs: {
      type: Array as () => LayoutTab[],
      required: true
    },
    inEditMode: {
      type: Boolean,
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
  mounted() {
    this.tabMenu = this.tabs.map((obj, index) => ({ id: index, label: obj.name }))
  },
  data() {
    return {
      activeTab: 0 as number,
      bypassChange: false,
      tabMenu: [] as any[]
    }
  },
  watch: {
    tabs: {
      handler(newTabs: LayoutTab[]) {
        this.tabMenu = newTabs.map((obj, index) => ({ id: index, label: obj.name }))
      },
      deep: true
    },
    activeTab: {
      handler(tabIndex: number) {
        ;(this.layoutManager as LayoutManager).currentTab = tabIndex
      }
    },
    layoutManager: {
      handler(newLayoutManager: LayoutManager, oldLayoutManager: LayoutManager) {
        if (newLayoutManager.currentTab != this.activeTab)
          this.activeTab = newLayoutManager.currentTab
      },
      deep: true
    }
  },
  methods: {
    gridUpdated(input: LayoutWidget[]) {
      const CurrentTab = (this.layoutManager as LayoutManager).currentTab
      ;(this.layoutManager as LayoutManager).updateGrid(input, this.tabs[CurrentTab].grid.id)
    },
    changeTab(id: number) {
      this.activeTab = id
      ;(this.layoutManager as LayoutManager).currentTab = id
    }
  }
})
</script>
