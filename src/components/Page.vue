<template>
  <div class="sticky top-0 z-50">
    <div class="bg-white block">
      <SelectWidgetLayout />
      <AddLayout v-if="inEditMode" />
      <EditWidgetsPage v-model="inEditMode"></EditWidgetsPage>
    </div>
  </div>
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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from "vue";
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
    const inEditMode = ref(true);

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

    return {
      inEditMode,
      gridUpdated,
      layoutManager,
    };
  },
});
</script>

<style scoped>
/* Your styling for the grid display component */
</style>
