<template>
  <!-- <AddTab v-if="inEditMode" /> -->
  <TabGroup
    :selected-index="currentTab"
    @change="changeTab"
    :key="layoutManager.currentLayout.tabs.length"
  >
    <TabList class="isolate flex rounded-lg shadow">
      <AddTab v-if="inEditMode" />
      <Tab
        as="template"
        v-slot="{ selected }"
        v-for="tab in $props.tabs"
        :key="tab.id"
      >
        <button
          :class="{
            'border-indigo-500 text-indigo-600': selected,
            'text-gray-500 border-gray-200': !selected,
            'w-full border-b-2 py-4 px-1 text-center text-sm font-medium': true,
          }"
        >
          <div class="flex flex-grow justify-center items-center">
            <div class="flex-grow">
              {{ tab.name }}
            </div>
            <div
              v-if="inEditMode"
              class="ml-auto text-red-500 cursor-pointer"
              @click="deleteTab(tab.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

              <span class="visually-hidden">Edit Properties</span>
            </div>
          </div>
        </button>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="tab in $props.tabs" :key="tab.name">
        <WidgetsGrid
          :layout="tab.grid"
          :inEditMode="inEditMode"
          @layout-updated="(n) => gridUpdated(n)"
        ></WidgetsGrid>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
<script lang="ts">
import { defineComponent, inject, ref, watch } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import AddTab from "./Tabs/Add.vue";
import { LayoutManager, LayoutTab, LayoutWidget } from "../types";

export default defineComponent({
  name: "WidgetsTabs",
  props: {
    tabs: {
      type: Array as () => LayoutTab[],
      required: true,
    },
    inEditMode: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    AddTab,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  setup(props) {
    const layoutManager = inject("$widgetLayoutManager") as LayoutManager;

    const currentTab = ref(0);

    watch(
      () => layoutManager.currentTab,
      () => {
        currentTab.value = layoutManager.currentTab;
      }
    );

    function changeTab(index: number) {
      layoutManager.currentTab = index;
    }

    function gridUpdated(input: LayoutWidget[]) {
      const tab = props.tabs[layoutManager.currentTab];
      tab.grid = input;
      layoutManager.updateTab(tab);
    }

    function deleteTab(id: number | string) {
      layoutManager.deleteTab(id);
    }

    return {
      layoutManager,
      currentTab,
      changeTab,
      gridUpdated,
      deleteTab,
    };
  },
});
</script>

<style scoped>
/* Your styling for the grid display component */
</style>
