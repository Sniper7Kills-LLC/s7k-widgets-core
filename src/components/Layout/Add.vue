<template>
  <div>
    <label
      for="layout-name"
      class="block text-sm font-medium leading-6 text-gray-900"
      >Layout Name</label
    >
    <div class="mt-2">
      <input
        v-model="layoutName"
        type="text"
        name="name"
        id="layout-name"
        class="block w-56 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
    <button
      @click="createNewLayout"
      class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Create New Layout
    </button>
    <button
      @click="renameLayout"
      class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Rename Layout
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref, watch } from "vue";
import { LayoutManager } from "../../types";

export default defineComponent({
  name: "AddLayout",
  setup() {
    const layoutName = ref("");
    const layoutManager = inject("$widgetLayoutManager") as LayoutManager;

    layoutName.value = layoutManager.currentLayout.name;

    watch(layoutManager, () => {
      layoutName.value = layoutManager.currentLayout.name;
    });

    function createNewLayout() {
      console.log("New Layout");
    }

    function renameLayout() {
      layoutManager.currentLayout.name = layoutName.value;
      layoutManager.save();
    }

    return {
      layoutName,
      createNewLayout,
      renameLayout,
    };
  },
});
</script>
