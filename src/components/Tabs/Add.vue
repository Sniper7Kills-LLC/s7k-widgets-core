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
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
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
                <div class="mt-3 text-center">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900"
                    >Add New Tab</DialogTitle
                  >
                </div>
              </div>
              <div>
                <label for="tabName" class="block text-sm font-medium leading-6 text-gray-900">
                  Name of New Tab
                </label>
                <div class="mt-2">
                  <input
                    v-model="newTabName"
                    type="text"
                    name="tabName"
                    id="tabName"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  @click="createTab"
                >
                  Add Tab
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
import { defineComponent, inject, ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { LayoutManager } from '@/types'

export default defineComponent({
  name: 'AddTab',
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot
  },
  props: {
    open: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:open'],
  setup(props, { emit }) {
    const isOpen = ref(props.open)

    watch(
      () => props.open,
      () => {
        isOpen.value = props.open
      }
    )

    function setIsOpen(value: boolean) {
      isOpen.value = value
      emit('update:open', value)
    }

    const newTabName = ref('')
    const layoutManager = inject('$widgetLayoutManager') as LayoutManager

    function createTab() {
      if (newTabName.value != '') {
        layoutManager.createTab(newTabName.value)
        newTabName.value = ''
        layoutManager.currentTab = layoutManager.currentLayout.tabs.length - 1
      }
    }

    // Expose data and methods to the template
    return {
      isOpen,
      setIsOpen,
      newTabName,
      createTab
    }
  }
})
</script>

<style scoped>
/* Your styling for the registration form component */
</style>
