<template>
  <Listbox v-model="$props.modelValue">
    <ListboxButton
      class="mt-2 w-56 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      {{ $props.modelValue.name }}
    </ListboxButton>
    <ListboxOptions
      class="mt-2 w-56 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <ListboxOption
        v-for="layout in $props.availableLayouts"
        :key="layout.name"
        :value="layout"
      >
        {{ layout.name }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

import { WidgetPageLayout } from "../../types";

export default defineComponent({
  name: "SelectWidgetLayout",
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  },
  props: {
    modelValue: {
      type: Object as () => WidgetPageLayout,
      required: true,
    },
    availableLayouts: {
      type: Array as () => WidgetPageLayout[],
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const selectedLayout = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        selectedLayout.value = newValue;
      }
    );
    return {
      selectedLayout,
    };
  },
});
</script>
