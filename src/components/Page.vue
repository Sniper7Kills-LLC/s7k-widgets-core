<template>
  <SelectWidgetLayout />
  <AddLayout v-if="inEditMode" />
  <EditWidgetsPage v-model="inEditMode"></EditWidgetsPage>
  <template v-if="layoutManager.currentLayout">
    <WidgetsGrid
      :layout="layoutManager.currentLayout.grid"
      :inEditMode="inEditMode"
      @layout-updated="gridUpdated"
    ></WidgetsGrid>
    <WidgetsTabs
      @layoutUpdated="tabsUpdated"
      v-if="layoutManager.currentLayout.hasTabs"
      :tabs="layoutManager.currentLayout.tabs"
      :inEditMode="inEditMode"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject, computed } from "vue";
import EditWidgetsPage from "./Page/Edit.vue";
import SelectWidgetLayout from "./Layout/Select.vue";
import AddLayout from "./Layout/Add.vue";
import { LayoutPage, LayoutManager, LayoutWidget } from "../types";

export default defineComponent({
  name: "WidgetsPage",
  props: {
    page: {
      type: String,
      default: "index",
    },
    defaultLayouts: {
      type: Array as () => LayoutPage[],
      required: true,
    },
  },
  components: {
    AddLayout,
    EditWidgetsPage,
    SelectWidgetLayout,
  },
  setup(props) {
    const inEditMode = ref(false);

    const layoutManager = inject("$widgetLayoutManager") as LayoutManager;

    // Fetch widgets on component mount
    onMounted(() => {
      if (layoutManager) {
        layoutManager.setPage(props.page, props.defaultLayouts);
      }
    });

    function gridUpdated(input: LayoutWidget[]) {
      layoutManager.updateGrid(input);
    }

    function tabsUpdated(input: any) {
      //selectedLayout.value.tabs = input;
      console.log("Tab Updated");
    }

    return {
      inEditMode,
      gridUpdated,
      tabsUpdated,
      layoutManager,
    };
  },
});
</script>

<style scoped>
/* Your styling for the grid display component */
</style>
