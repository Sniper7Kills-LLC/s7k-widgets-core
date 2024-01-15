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
              <div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                    >Import/Export Layouts</DialogTitle
                  >
                  <DialogDescription class="mt-2 text-sm text-gray-500">
                    Import or Export Layouts to share with other users.
                  </DialogDescription>
                </div>
              </div>
              <div>
                <fieldset>
                  <legend class="sr-only">Available Layouts</legend>
                  <div class="space-y-5">
                    <div
                      class="relative flex items-start"
                      v-for="layout in layoutManager.savedLayouts"
                      :key="layout.id"
                    >
                      <div class="min-w-0 flex-1 text-sm leading-6">
                        <label
                          :for="`layout-${layout.id}`"
                          class="select-none font-medium text-gray-900"
                        >
                          [ {{ layout.page }} ]
                          {{ layout.name }}
                        </label>
                      </div>
                      <div class="ml-3 flex h-6 items-center">
                        <input
                          :id="`layout-${layout.id}`"
                          :name="`layout-${layout.id}`"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          @click.stop
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  @click="setIsOpen(false)"
                >
                  Close
                </button>
              </div>
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
  DialogTitle,
  DialogDescription,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { LayoutManager } from "../../types";
//import { WidgetManager } from "../../types";

export default defineComponent({
  name: "RegisterWidget",
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
    TransitionChild,
    TransitionRoot,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
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

    // Use inject in the setup function
    const layoutManager = inject("$widgetLayoutManager") as LayoutManager;

    function setIsOpen(value: boolean) {
      isOpen.value = value;
      emit("update:open", value);
    }

    const ui = {
      dialog: {
        outter: "",
      },
    };

    // Expose data and methods to the template
    return {
      ui,
      isOpen,
      setIsOpen,
      layoutManager,
    };
  },
});
</script>

<style scoped>
/* Your styling for the registration form component */
</style>
