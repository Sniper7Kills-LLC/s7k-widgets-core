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
              id="WidgetImport"
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
    <div v-if="this.widgets.length > 0" class="pt-4 max-h-56 overflow-y-auto">
      <table class="w-full">
        <thead>
          <tr>
            <th
              class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Widget Name
            </th>
            <th class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
              <span class="sr-only">Register</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="widget in widgets" :key="widget.id">
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
              {{ widget.name }}
            </td>
            <td>
              <button
                class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="importWidget(widget.id)"
              >
                Register
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import type { WidgetManager, ManagedWidget } from "../../types";

export default defineComponent({
  name: "ImportWidget",
  data() {
    return {
      files: [] as { name: string }[],
      widgets: [] as ManagedWidget[],
    };
  },
  setup() {
    const widgetManager = inject("$widgetManager") as WidgetManager;
    return {
      widgetManager,
    };
  },
  methods: {
    importWidget(widgetID: number | string) {
      const widgetIndex = this.widgets.findIndex(
        (widget) => widget.id == widgetID
      );

      if (widgetIndex == -1) return;

      const widget = this.widgets[widgetIndex];
      this.widgetManager.addUserWidget(widget);

      this.widgets.splice(widgetIndex, 1);
    },
    openFileInput() {
      // Trigger file input click
      const fileInput = this.$el.querySelector("#WidgetImport");
      if (fileInput) {
        fileInput.click();
      }
    },
    onFileSelection(e: Event) {
      const input = e.target as HTMLInputElement;
      if (input.files) {
        for (let i = 0; i < input.files.length; i++) {
          this.processFile(input.files[i]);
        }
      }
      // Reset file input
      input.value = "";
    },
    onFileDrop(e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      const dt = e.dataTransfer;
      if (dt === null) return;
      if (dt.files) {
        for (let i = 0; i < dt.files.length; i++) {
          this.processFile(dt.files[i]);
        }
      }
    },
    processFile(file: File) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target == null) return;
        const content = event.target.result as string;
        try {
          const jsonData = JSON.parse(content);
          if (Array.isArray(jsonData)) {
            for (let widget of jsonData as ManagedWidget[]) {
              if (widget == null) return;
              if (
                this.widgets.findIndex(
                  (widgetForImport) => widgetForImport.id === widget.id
                ) == -1
              )
                this.widgets.push(widget);
            }
          } else if (typeof jsonData === "object" && jsonData !== null) {
            if (
              this.widgets.findIndex(
                (widgetForImport) =>
                  widgetForImport.id === (jsonData as ManagedWidget).id
              ) == -1
            )
              this.widgets.push(jsonData as ManagedWidget);
          } else {
            console.log("Data apears to be corrupt.");
          }
          // Process the Data
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(file);
    },
  },
});
</script>
