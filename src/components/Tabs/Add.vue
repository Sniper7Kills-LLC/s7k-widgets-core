<template>
  <div class="flex items-center space-x-2">
    <div>
      <div class="">
        <input
          v-model="newTabName"
          type="text"
          name="name"
          id="tab-name"
          class="block w-56 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    <div class="flex items-center space-x-2 h-full">
      <button
        @click="createTab"
        class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create Tab
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { LayoutManager } from "../../types";

export default defineComponent({
  name: "AddTab",
  setup() {
    const newTabName = ref("");
    const layoutManager = inject("$widgetLayoutManager") as LayoutManager;

    function createTab() {
      if (newTabName.value != "") {
        layoutManager.createTab(newTabName.value);
        newTabName.value = "";
        layoutManager.currentTab = layoutManager.currentLayout.tabs.length - 1;
      }
    }

    return {
      newTabName,
      createTab,
    };
  },
});
</script>
