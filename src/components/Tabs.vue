<template>
  <TabGroup>
    <TabList class="isolate flex divide-x divide-gray-200 rounded-lg shadow">
      <Tab
        class="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
        v-for="tab in $props.tabs"
        :key="tab.name"
      >
        {{ tab.name }}
      </Tab>
    </TabList>
    <AddTab v-if="inEditMode"></AddTab>
    <TabPanels>
      <TabPanel v-for="tab in $props.tabs" :key="tab.name">
        <WidgetsGrid
          :layout="tab.grid"
          :inEditMode="inEditMode"
          @layout-updated="(n) => gridUpdated(tab.name, n)"
        />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import AddTab from "./Tabs/Add.vue";
import { LayoutTabs } from "../types";

export default defineComponent({
  name: "WidgetsTabs",
  props: {
    tabs: {
      type: Array as () => LayoutTabs[],
      required: true,
    },
    inEditMode: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["layoutUpdated"],
  components: {
    AddTab,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  setup(props, { emit }) {
    function gridUpdated(tabname: string, input: any) {
      let tabs = props.tabs;
      let tab = tabs.find((tab) => tab.name === tabname);
      if (tab) {
        tab.grid = input;
      }
      emit(
        "layoutUpdated",
        tabs.filter((tab) => tab?.grid.length > 0)
      );
    }

    return {
      gridUpdated,
    };
  },
});
</script>

<style scoped>
/* Your styling for the grid display component */
</style>
