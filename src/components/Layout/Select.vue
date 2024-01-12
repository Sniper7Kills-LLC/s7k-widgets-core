<template>
  <Listbox v-model="selectedLayoutID">
    <ListboxButton
      class="mt-2 w-56 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      {{ layoutManager.currentLayout.name }}
    </ListboxButton>
    <ListboxOptions
      class="mt-2 w-56 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <ListboxOption
        v-for="layout in layoutManager.getLayoutNames()"
        :key="layout.name"
        :value="layout.id"
      >
        {{ layout.name }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
  <AddLayout />
</template>
<script lang="ts">
import { defineComponent, inject, ref, watch } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

import { LayoutManager } from "../../types";
import AddLayout from "./Add.vue";

export default defineComponent({
  name: "SelectWidgetLayout",
  components: {
    AddLayout,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  },
  setup() {
    const layoutManager = inject("$widgetLayoutManager") as LayoutManager;
    const selectedLayoutID = ref();

    watch(selectedLayoutID, (newID: number | string) => {
      layoutManager.setLayout(newID);
    });

    return {
      selectedLayoutID,
      layoutManager,
    };
  },
});
</script>
