<template>
  <SelectWidgetLayout
    v-model="selectedLayout"
    :availableLayouts="availableLayouts"
  ></SelectWidgetLayout>
  <EditWidgetsPage v-model="inEditMode"></EditWidgetsPage>
  <template v-if="selectedLayout">
    <WidgetsGrid
      :layout="selectedLayout.grid"
      :inEditMode="inEditMode"
      @layout-updated="gridUpdated"
    ></WidgetsGrid>
    <WidgetsTabs
      @layoutUpdated="tabsUpdated"
      v-if="selectedLayout.hasTabs"
      :tabs="selectedLayout.tabs"
      :inEditMode="inEditMode"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject, computed } from "vue";
import EditWidgetsPage from "./Page/Edit.vue";
import SelectWidgetLayout from "./Page/Layout.vue";
import { WidgetPageLayout, WidgetLayoutManager } from "../types";

export default defineComponent({
  name: "WidgetsPage",
  props: {
    page: {
      type: String,
      default: "index",
    },
    layout: {
      type: Object as () => WidgetPageLayout,
      required: true,
    },
  },
  components: {
    EditWidgetsPage,
    SelectWidgetLayout,
  },
  setup(props) {
    const inEditMode = ref(false);

    // Use ref to hold the widgets data
    const selectedLayout = ref<WidgetPageLayout>(props.layout);
    const savedLayouts = ref<WidgetPageLayout[]>([]);

    // Fetch widgets on component mount
    onMounted(() => {
      // Access $widgetManager using inject
      const layoutManager = inject(
        "$widgetLayoutManager"
      ) as WidgetLayoutManager;

      if (layoutManager) {
        // Update the widgets data with the current widgets from the manager
        savedLayouts.value = layoutManager.getLayouts(props.page);
      }
    });

    // eslint-disable-next-line vue/no-setup-props-destructure
    let providedLayout = props.layout;
    providedLayout.name = "Default - " + providedLayout.name;
    const availableLayouts = [...savedLayouts.value, providedLayout];

    selectedLayout.value = availableLayouts[0];

    function gridUpdated(input: any) {
      selectedLayout.value.grid = input;
    }

    function tabsUpdated(input: any) {
      selectedLayout.value.tabs = input;
    }

    return {
      inEditMode,
      availableLayouts,
      selectedLayout,
      gridUpdated,
      tabsUpdated,
    };
  },
});
</script>

<style scoped>
/* Your styling for the grid display component */
</style>
