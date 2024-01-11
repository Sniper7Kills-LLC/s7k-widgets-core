<template>
  <div>
    <ul class="flex flex-grow space-x-2">
      <li v-for="widget in widgets" :key="widget.name">
        <div
          class="droppable-element"
          draggable="true"
          @drag="drag"
          @dragend="dragend"
        >
          <img class="h-32" src="https://placehold.co/600x400" />
          {{ widget.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from "vue";
import { Widget, WidgetManager } from "../../types";

export default defineComponent({
  name: "AddWidget",
  setup() {
    // Use ref to hold the widgets data
    const widgets = ref<Widget[]>([]);

    // Fetch widgets on component mount
    onMounted(() => {
      // Access $widgetManager using inject
      const widgetManager = inject("$widgetManager") as WidgetManager;

      if (widgetManager) {
        // Update the widgets data with the current widgets from the manager
        widgets.value = widgetManager.getWidgets();
      }
    });

    const drag = (e: DragEvent): void => {
      e.stopPropagation();
      e.preventDefault();
      console.log(e);
    };

    const dragend = (): void => {
      console.log("Drag End");
    };

    return {
      drag,
      dragend,
      widgets,
    };
  },
});
</script>

<style scoped>
/* Your styling for the available widgets list component */
</style>
