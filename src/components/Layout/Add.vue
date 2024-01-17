<template>
  <div class="flex items-center space-x-2">
    <div>
      <div class="">
        <input
          v-model="layoutName"
          type="text"
          name="name"
          id="layout-name"
          class="block w-56 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    <div class="flex items-center space-x-2 h-full">
      <button
        @click="renameLayout"
        class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Rename Layout
      </button>
      <button
        @click="createNewLayout"
        class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        New Layout
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue'
import type { LayoutManager } from '@/types'

export default defineComponent({
  name: 'AddLayout',
  setup() {
    const layoutName = ref('')
    const layoutManager = inject('$widgetLayoutManager') as LayoutManager

    layoutName.value = layoutManager.currentLayout.name

    watch(layoutManager, () => {
      layoutName.value = layoutManager.currentLayout.name
    })

    function createNewLayout() {
      layoutManager.createLayout(layoutName.value)
    }

    function renameLayout() {
      layoutManager.currentLayout.name = layoutName.value
      layoutManager.save()
    }

    return {
      layoutName,
      createNewLayout,
      renameLayout
    }
  }
})
</script>
