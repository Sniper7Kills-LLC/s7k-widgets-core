<template>
  <GridLayout
    id="GridLayout"
    :layout="$props.layout"
    :col-num="3"
    @layout-updated="layoutUpdatedEvent"
    :is-draggable="$props.inEditMode"
    :is-resizable="$props.inEditMode"
  >
    <GridItem
      :showCloseButton="$props.inEditMode"
      v-for="item in layout"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :enableEditMode="$props.inEditMode"
      @remove-grid-item="removeGridItem"
      :class="[
        $props.inEditMode
          ? 'rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          : '',
        'overflow-hidden',
      ]"
    >
      <component
        :is="widgetManager.getWidget(item.widgetID).as"
        v-bind="item.props"
      ></component>
    </GridItem>
  </GridLayout>
</template>

<script lang="ts">
import { inject, defineComponent, ref, onMounted } from "vue";
import { GridItem, GridLayout } from "vue-ts-responsive-grid-layout";
import { LayoutWidget, WidgetManager } from "../types";

export default defineComponent({
  name: "WidgetsGrid",
  props: {
    inEditMode: {
      type: Boolean,
      required: true,
    },
    layout: {
      type: Array as () => LayoutWidget[],
      required: true,
    },
  },
  components: {
    GridItem,
    GridLayout,
  },
  emits: ["layoutUpdated"],
  setup(props, { emit }) {
    // Use ref to hold the widgets data
    const widgetManager = inject("$widgetManager") as WidgetManager;

    function layoutUpdatedEvent(newLayout: LayoutWidget[]): void {
      emit("layoutUpdated", newLayout);
    }

    function removeGridItem(remove: number | string) {
      // eslint-disable-next-line vue/no-mutating-props
      emit(
        "layoutUpdated",
        props.layout.filter((item: LayoutWidget) => item.i != remove)
      );
    }

    return {
      removeGridItem,
      layoutUpdatedEvent,
      widgetManager,
    };
  },
});
</script>

<style>
.btn-close {
  height: 24px;
  position: absolute;
  right: 3px;
  top: 3px;
  width: 24px;
  z-index: 20;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>') !important;
}
.visually-hidden {
  display: none;
}
.icon icon-cross {
  background-image: linear-gradient(to right, black 1px, transparent 1px),
    linear-gradient(to bottom, black 1px, transparent 1px);
}

.vue-grid-item {
  touch-action: none;
}

.vue-close-button:hover {
  cursor: pointer;
  filter: brightness(0) invert(1);
  opacity: 0.8;
}

.grid::before {
  content: "";
  height: calc(100% - 5px);
  width: calc(100% - 5px);
  position: absolute;
  background-repeat: repeat;
  margin: 5px;
}
</style>
