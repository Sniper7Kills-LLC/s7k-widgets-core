<template>
  <div>
    <ul class="flex flex-grow space-x-2 overflow-x-auto">
      <li v-for="widget in widgets" :key="widget.name">
        <div
          class="droppable-element"
          draggable="true"
          @dragstart="selectedWidget = widget"
          @drag="drag"
          @dragend="dragend"
        >
          <img
            class="h-32"
            :src="
              widget.thumbnail
                ? widget.thumbnail
                : widget.thumbnail64
                  ? 'data:image/png;base64,' + widget.thumbnail64
                  : 'https://placehold.co/600x400?text=' + widget.name
            "
          />
          {{ widget.name }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { WidgetManager, ManagedWidget, LayoutManager, LayoutWidget } from '@/types'

export default defineComponent({
  name: 'AddWidget',
  inject: {
    widgetManager: {
      from: '$widgetManager'
    },
    layoutManager: {
      from: '$widgetLayoutManager'
    }
  },
  data() {
    return {
      widgets: [] as ManagedWidget[],
      selectedWidget: null as ManagedWidget | null,
      mouseXY: { x: 0, y: 0 } as { x: number, y: number },
    }
  },
  mounted() {
    this.widgets = (this.widgetManager as WidgetManager).getWidgets((this.layoutManager as LayoutManager).currentPage);
  },
  watch: {
    widgetManager: {
      handler(newWidgetManager, oldWidgetManager) {
        this.widgets = (this.widgetManager as WidgetManager).getWidgets((this.layoutManager as LayoutManager).currentPage);
      },
      deep: true,
    }
  },
  methods: {
    drag(e: DragEvent) {
      e.stopPropagation();
      e.preventDefault();
      if (e.clientX != 0 && e.clientY != 0) {
        this.mouseXY.x = e.clientX
        this.mouseXY.y = e.clientY
      }
    },
    dragend() {
      if (this.selectedWidget === null) return
      // Get all elements with the id of "GridLayout"
      const gridLayoutElements = document.querySelectorAll('#GridLayout')

      let mouseInGrid = false
      let gridID: number | string | null = null

      gridLayoutElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (
          this.mouseXY.x > rect.left &&
          this.mouseXY.x < rect.right &&
          this.mouseXY.y > rect.top &&
          this.mouseXY.y < rect.bottom
        ) {
          mouseInGrid = true
          gridID = element.getAttribute('grid-id')
        }
      })

      if (!mouseInGrid) {
        return
      }

      if (gridID === null) {
        console.error('Was not able to detect the Grid ID the Widget should be added to.')
        return
      }

      if (this.selectedWidget == null) {
        console.log('SELECTED WIDGET IS NULL')
        return
      }

      const widget = {
        name: this.selectedWidget.name,
        widgetID: this.selectedWidget.id,
        props: this.selectedWidget.defaultProps ? this.selectedWidget.defaultProps : {},
        x: 0,
        y: 0,
        w: this.selectedWidget.width ? this.selectedWidget.width : 1,
        h: this.selectedWidget.height ? this.selectedWidget.height : 1,
        i: uuidv4(),
        moved: false
      } as LayoutWidget

      (this.layoutManager as LayoutManager).addWidgetToGrid(widget, gridID)
    },
    widgetSelected(widget: ManagedWidget) {
      this.selectedWidget = widget
    }
  },
  //setup() {
    // Use ref to hold the widgets data
    // const widgets = ref<ManagedWidget[]>([])
    // const layoutManager = inject('$widgetLayoutManager') as LayoutManager
    // const selectedWidget = ref<ManagedWidget | null>(null)
    // // Access $widgetManager using inject
    // const widgetManager = inject('$widgetManager') as WidgetManager

    // Fetch widgets on component mount
    // onMounted(() => {
    //   if (widgetManager) {
    //     // Update the widgets data with the current widgets from the manager
    //     widgets.value = widgetManager.getWidgets(layoutManager.currentPage)
    //   }
    // })

    // watch(
    //   () => widgetManager.widgets,
    //   () => {
    //     widgets.value = widgetManager.getWidgets(layoutManager.currentPage)
    //   }
    // )

    // let mouseXY = { x: 0, y: 0 }

    // const drag = (e: DragEvent): void => {
    //   e.stopPropagation()
    //   e.preventDefault()
    //   // Track the mouse X, Y position during drag
    //   if (e.clientX != 0 && e.clientY != 0) {
    //     mouseXY.x = e.clientX
    //     mouseXY.y = e.clientY
    //   }
    //   //console.log(`Mouse Position - X: ${mouseX}, Y: ${mouseY}`);
    //   //console.log(mouseXY);
    // }

    /**
     * The following is the logic that determins where the new widget should go.
     * It **ASSUMES** it is being used on the `WidgetsPage` component;
     * and will not function as expected if used on a page not containing a grid followed by tabs
     *
     * TODO:
     *    - Possibly identify the grids by ID;
     *    - Identify the grid based on the ID
     */
    // const dragend = (): void => {
    //   if (selectedWidget.value === null) return
    //   // Get all elements with the id of "GridLayout"
    //   const gridLayoutElements = document.querySelectorAll('#GridLayout')

    //   let mouseInGrid = false
    //   let gridID: number | string | null = null

    //   gridLayoutElements.forEach((element) => {
    //     const rect = element.getBoundingClientRect()
    //     if (
    //       mouseXY.x > rect.left &&
    //       mouseXY.x < rect.right &&
    //       mouseXY.y > rect.top &&
    //       mouseXY.y < rect.bottom
    //     ) {
    //       mouseInGrid = true
    //       gridID = element.getAttribute('grid-id')
    //     }
    //   })

    //   if (!mouseInGrid) {
    //     return
    //   }

    //   if (gridID === null) {
    //     console.error('Was not able to detect the Grid ID the Widget should be added to.')
    //     return
    //   }

    //   if (selectedWidget.value == null) {
    //     console.log('SELECTED WIDGET IS NULL')
    //     return
    //   }

    //   const widget = {
    //     name: selectedWidget.value?.name,
    //     widgetID: selectedWidget.value?.id,
    //     props: selectedWidget.value.defaultProps ? selectedWidget.value.defaultProps : {},
    //     x: 0,
    //     y: 0,
    //     w: selectedWidget.value.width ? selectedWidget.value.width : 1,
    //     h: selectedWidget.value.height ? selectedWidget.value.height : 1,
    //     i: uuidv4(),
    //     moved: false
    //   } as LayoutWidget

    //   layoutManager.addWidgetToGrid(widget, gridID)
    // }

    // function widgetSelected(widget: ManagedWidget) {
    //   selectedWidget.value = widget
    // }

    // return {
    //   drag,
    //   dragend,
    //   widgets,
    //   widgetSelected,
    //   selectedWidget
    // }
  //}
})
</script>

<style scoped></style>
