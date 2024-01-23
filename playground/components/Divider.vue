<template>
  <WidgetInterface
    :in-edit-mode="inEditMode"
    :widget-id="widgetId"
    :settings="settings"
  >
    <!-- <template #settings="{ widgetSettings }">
      <div>
        <label
          for="label"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Divider Label</label
        >
        <div class="mt-2">
          <input
            type="text"
            name="label"
            id="label"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="widgetSettings.label"
            placeholder=""
          />
        </div>
      </div>
    </template> -->

    <div class="h-full flex items-center">
      <div class="relative w-full">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-surface-800 dark:border-surface-0" />
        </div>
        <div class="relative flex justify-center">
          <span
            class="px-3 text-base font-semibold leading-6 bg-surface-0 dark:bg-surface-800 text-surface-700 dark:text-surface-0/80"
          >
            {{ label }}
          </span>
        </div>
      </div>
    </div>
  </WidgetInterface>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import WidgetInterface from "../../src/components/Widget.vue";
import defaultWidgetComponent from "../../src/defineWidget";

export default defineComponent({
  name: "WidgetDivider",
  components: {
    WidgetInterface,
  },
  props: {
    ...defaultWidgetComponent.props,
    label: {
      type: String,
      default: "Divider",
    },
  },
});
</script>

<style scoped>
/* Your styling for the grid display component */
</style>
