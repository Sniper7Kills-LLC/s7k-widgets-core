<template>
  <div class="h-full flex items-center">
    <div class="relative w-full">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center">
        <span
          class="bg-white px-3 text-base font-semibold leading-6 text-gray-900"
        >
          {{ label }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WidgetDivider",
  props: {
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
