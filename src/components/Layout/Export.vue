<template>
  <div class="pt-4 space-y-4">
    <div v-if="layouts.length > 0" class="pt-4 max-h-56 overflow-y-scroll">
      <table class="w-full">
        <thead>
          <tr>
            <th
              class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Page
            </th>
            <th class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
              Layout Name
            </th>
            <th class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
              <span class="sr-only">Export</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="layout in layouts" :key="layout.id">
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
              {{ layout.page }}
            </td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
              <input
                type="text"
                name="layout-name"
                v-model="layout.name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </td>
            <td><input v-model="layout.shouldExport" type="checkbox" /></td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="downloadLayouts"
      >
        Export
      </button>
    </div>
    <div v-else>
      <p class="text-center text-bold px-3.5 py-2.5">No Saved Layouts To Export.</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import type { LayoutManager, LayoutPage } from '@/types'

type ExportableLayout = LayoutPage & {
  shouldExport?: boolean
}

export default defineComponent({
  name: 'ExportLayout',
  inject: {
    layoutManager: {
      from: '$widgetLayoutManager'
    }
  },
  data() {
    return {
      layouts: [] as ExportableLayout[],
    }
  },
  mounted() {
    this.layouts = (this.layoutManager as LayoutManager).savedLayouts;
  },
  methods: {
    downloadLayouts() {
      // Get the layouts we marked to export
      const exportLayouts = this.layouts
        // Get the ones set to be exported
        .filter((layout) => {
          return layout.shouldExport
        })
        // Remove "Should Export" variable to false
        .map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ shouldExport, ...layoutWithoutShouldExport }) => layoutWithoutShouldExport
        )
      if (exportLayouts.length == 0) return
      
      // Set Default to Fale
      exportLayouts.forEach((layout) => {
        layout.default = false
      })

      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(exportLayouts)
      )}`
      const filename = 'WidgetLayouts.json'

      const anchorEl = document.createElement('a')
      anchorEl.href = dataUri
      anchorEl.download = filename
      document.body.appendChild(anchorEl)
      anchorEl.click()
      document.body.removeChild(anchorEl)
      this.layouts.forEach((layout) => {
        layout.shouldExport = false
      })
    }
  },
})
</script>
