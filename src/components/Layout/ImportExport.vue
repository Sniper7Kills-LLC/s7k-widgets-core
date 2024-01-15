<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="setIsOpen(false)">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <TabGroup>
                <TabList class="isolate flex rounded-lg shadow">
                  <Tab as="template" v-slot="{ selected }">
                    <button
                      :class="{
                        'border-indigo-500 text-indigo-600': selected,
                        'text-gray-500 border-gray-200': !selected,
                        'w-full border-b-2 py-4 px-1 text-center text-sm font-medium': true,
                      }"
                    >
                      Import
                    </button>
                  </Tab>
                  <Tab as="template" v-slot="{ selected }">
                    <button
                      :class="{
                        'border-indigo-500 text-indigo-600': selected,
                        'text-gray-500 border-gray-200': !selected,
                        'w-full border-b-2 py-4 px-1 text-center text-sm font-medium': true,
                      }"
                    >
                      Export
                    </button>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel><ImportLayout></ImportLayout></TabPanel>
                  <TabPanel><ExportLayout></ExportLayout></TabPanel>
                </TabPanels>
              </TabGroup>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@headlessui/vue";
import ImportLayout from "./Import.vue";
import ExportLayout from "./Export.vue";

export default defineComponent({
  name: "RegisterWidget",
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    ImportLayout,
    ExportLayout,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:open"],
  setup(props, { emit }) {
    const isOpen = ref(props.open);

    watch(
      () => props.open,
      () => {
        isOpen.value = props.open;
      }
    );

    function setIsOpen(value: boolean) {
      isOpen.value = value;
      emit("update:open", value);
    }

    // Expose data and methods to the template
    return {
      isOpen,
      setIsOpen,
    };
  },
});
</script>

<style scoped>
/* Your styling for the registration form component */
</style>
