<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton
      class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      Tab Options
    </MenuButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute z-10 right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        style="z-index: 10 !important"
      >
        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-violet-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            ]"
            @click="addTabOpen = true"
          >
            Add Tab
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-violet-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            ]"
            @click="reorderTabsOpen = true"
          >
            Modify Tabs
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
  <AddTab v-model:open="addTabOpen"></AddTab>
  <ReorderTabs v-model:open="reorderTabsOpen"></ReorderTabs>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import AddTab from "./Add.vue";
import ReorderTabs from "./Reorder.vue";
// import { LayoutManager } from "../../types";

export default defineComponent({
  name: "EditTabs",
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    AddTab,
    ReorderTabs,
  },
  setup() {
    const addTabOpen = ref(false);
    const reorderTabsOpen = ref(false);
    // const layoutManager = inject("$widgetLayoutManager") as LayoutManager;

    return {
      reorderTabsOpen,
      addTabOpen,
    };
  },
});
</script>
