<template>
  <div class="col-span-full">
    <!-- Use @click to trigger file input -->
    <div
      @click="openFileInput"
      @drop.prevent="onFileDrop"
      @dragover.prevent
      class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
    >
      <div class="text-center">
        <div class="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            for="file-upload"
            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <!-- Use @change to handle file selection -->
            <input
              id="LayoutImport"
              name="file-upload"
              type="file"
              class="sr-only"
              @change="onFileSelection"
            />
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>
      </div>
    </div>
    <div v-if="layouts.length > 0" class="pt-4 max-h-56 overflow-y-auto">
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
            <td>
              <button
                class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="importLayout(layout.id)"
              >
                Import
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import type { LayoutManager, LayoutPage } from '@/types'

export default defineComponent({
  name: 'ImportLayout',
  data() {
    return {
      files: [] as { name: string }[],
      layouts: [] as LayoutPage[]
    }
  },
  setup() {
    const layoutManager = inject('$widgetLayoutManager') as LayoutManager
    return {
      layoutManager
    }
  },
  methods: {
    importLayout(layoutID: number | string) {
      const layoutIndex = this.layouts.findIndex((layout) => layout.id == layoutID)

      if (layoutIndex == -1) return

      const layout = this.layouts[layoutIndex]
      this.layoutManager.addLayout(layout)

      this.layouts.splice(layoutIndex, 1)
    },
    openFileInput() {
      // Trigger file input click
      const fileInput = this.$el.querySelector('#LayoutImport')
      if (fileInput) {
        fileInput.click()
      }
    },
    onFileSelection(e: Event) {
      const input = e.target as HTMLInputElement
      if (input.files) {
        for (let i = 0; i < input.files.length; i++) {
          this.processFile(input.files[i])
        }
      }
      // Reset file input
      input.value = ''
    },
    onFileDrop(e: DragEvent) {
      e.preventDefault()
      e.stopPropagation()
      const dt = e.dataTransfer
      if (dt === null) return
      if (dt.files) {
        for (let i = 0; i < dt.files.length; i++) {
          this.processFile(dt.files[i])
        }
      }
    },
    processFile(file: File) {
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target == null) return
        const content = event.target.result as string
        try {
          const jsonData = JSON.parse(content)
          if (Array.isArray(jsonData)) {
            for (let layout of jsonData as LayoutPage[]) {
              if (layout == null) return
              if (
                this.layouts.findIndex((layoutForImport) => layoutForImport.id === layout.id) == -1
              )
                this.layouts.push(layout)
            }
          } else if (typeof jsonData === 'object' && jsonData !== null) {
            if (
              this.layouts.findIndex(
                (layoutForImport) => layoutForImport.id === (jsonData as LayoutPage).id
              ) == -1
            )
              this.layouts.push(jsonData as LayoutPage)
          } else {
            console.log('Data apears to be corrupt.')
          }
          // Process the Data
        } catch (error) {
          console.error('Error parsing JSON:', error)
        }
      }

      reader.readAsText(file)
    }
  }
})
</script>
