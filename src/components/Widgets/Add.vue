<template>
  <div>
    <ul class="flex flex-grow space-x-2">
      <li v-for="widget in widgets" :key="widget.name">
        <div
          class="droppable-element"
          draggable="true"
          @dragstart="selectedWidget = widget"
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
import { v4 as uuidv4 } from "uuid";
import {
  Widget,
  WidgetManager,
  ManagedWidget,
  LayoutManager,
  LayoutWidget,
} from "../../types";

export default defineComponent({
  name: "AddWidget",
  setup() {
    // Use ref to hold the widgets data
    const widgets = ref<Widget[]>([]);
    const layoutManager = inject("$widgetLayoutManager") as LayoutManager;
    const selectedWidget = ref<ManagedWidget | null>(null);

    // Fetch widgets on component mount
    onMounted(() => {
      // Access $widgetManager using inject
      const widgetManager = inject("$widgetManager") as WidgetManager;

      if (widgetManager) {
        // Update the widgets data with the current widgets from the manager
        widgets.value = widgetManager.getWidgets();
      }
    });

    let mouseXY = { x: 0, y: 0 };

    const drag = (e: DragEvent): void => {
      e.stopPropagation();
      e.preventDefault();
      // Track the mouse X, Y position during drag
      if (e.clientX != 0 && e.clientY != 0) {
        mouseXY.x = e.clientX;
        mouseXY.y = e.clientY;
      }
      //console.log(`Mouse Position - X: ${mouseX}, Y: ${mouseY}`);
      //console.log(mouseXY);
    };

    const dragend = (): void => {
      if (selectedWidget.value === null) return;
      // Get all elements with the id of "GridLayout"
      const gridLayoutElements = document.querySelectorAll("#GridLayout");

      let mouseInGrid = false;
      let gridIndex = -1;

      gridLayoutElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (
          mouseXY.x > rect.left &&
          mouseXY.x < rect.right &&
          mouseXY.y > rect.top &&
          mouseXY.y < rect.bottom
        ) {
          mouseInGrid = true;
          gridIndex = index;
        }
      });

      if (!mouseInGrid) {
        return;
      }

      if (gridIndex == 0) {
        // Add Widget To Grid
        layoutManager.addWidgetToGrid({
          name: selectedWidget.value?.name,
          widgetID: selectedWidget.value?.id,
          props: selectedWidget.value ? selectedWidget.value.defaultProps : {},
          x: 1,
          y: 0,
          w: 1,
          h: 1,
          i: uuidv4(),
          moved: false,
        } as LayoutWidget);
      }

      if (gridIndex == 1) {
        layoutManager.addWidgetToTab({
          name: selectedWidget.value?.name,
          widgetID: selectedWidget.value?.id,
          props: selectedWidget.value ? selectedWidget.value.defaultProps : {},
          x: 1,
          y: 0,
          w: 1,
          h: 1,
          i: uuidv4(),
          moved: false,
        } as LayoutWidget);
      }
    };

    function widgetSelected(widget: ManagedWidget) {
      selectedWidget.value = widget;
    }

    return {
      drag,
      dragend,
      widgets,
      widgetSelected,
      selectedWidget,
    };
  },
});
</script>

<style scoped>
/* Your styling for the available widgets list component */
</style>
