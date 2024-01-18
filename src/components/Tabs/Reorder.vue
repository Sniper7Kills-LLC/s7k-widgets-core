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
                    >Reorder Tabs</DialogTitle
                  >
                </div>
              </div>
              <draggable
                @start="drag = true"
                @end="drag = false"
                v-model="layoutManager.currentLayout.tabs"
                item-key="id"
              >
                <template #item="{ element }">
                  <div
                    class="p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg cursor-move"
                  >
                    <input v-model="element.name" type="text" />
                  </div>
                </template>
              </draggable>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  @click="
                    () => {
                      layoutManager.save()
                      setIsOpen(false)
                    }
                  "
                >
                  Save
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
import draggable from 'vuedraggable'
import type { LayoutManager } from '@/types'

export default defineComponent({
  name: 'ReorderTabs',
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    draggable
  },
  props: {
    open: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      drag: false
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

    const layoutManager = inject('$widgetLayoutManager') as LayoutManager

    // Expose data and methods to the template
    return {
      isOpen,
      setIsOpen,
      layoutManager
    }
  }
})
</script>

<style scoped>
/* Your styling for the registration form component */
</style>
