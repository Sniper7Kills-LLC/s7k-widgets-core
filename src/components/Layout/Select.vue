<template>
  <Listbox v-model="selectedLayoutID" :key="layoutManager.getLayoutNames()">
    <div class="relative mt-2 z-50">
      <ListboxButton
        class="relative w-48 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        {{ layoutManager.currentLayout.name }}
      </ListboxButton>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="z-20 absolute mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="layout in layoutManager.getLayoutNames()"
            :key="layout.name"
            :value="layout.id"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                ]"
                >{{ layout.name }}</span
              >

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
<script lang="ts">
import { defineComponent, inject, ref, watch } from "vue";
import { CheckIcon } from "@heroicons/vue/24/solid";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

import { LayoutManager } from "../../types";

export default defineComponent({
  name: "SelectWidgetLayout",
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
  },
  setup() {
    const layoutManager = inject("$widgetLayoutManager") as LayoutManager;
    const selectedLayoutID = ref(layoutManager.currentLayout.id);

    watch(selectedLayoutID, (newID: number | string) => {
      layoutManager.setLayout(newID);
    });

    watch(
      () => layoutManager.currentLayout.id,
      () => {
        selectedLayoutID.value = layoutManager.currentLayout.id;
      }
    );

    return {
      selectedLayoutID,
      layoutManager,
    };
  },
});
</script>
