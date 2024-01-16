<template>
  <GridLayout
    v-if="$props.layout"
    id="GridLayout"
    :layout="$props.layout"
    :col-num="3"
    @layout-updated="layoutUpdatedEvent"
    :is-draggable="$props.inEditMode"
    :is-resizable="$props.inEditMode"
    :key="window['widgets']"
  >
    <GridItem
      :showCloseButton="$props.inEditMode"
      v-for="item in $props.layout"
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
      <ModifyWidgetProperties
        v-if="inEditMode"
        :widgetId="item.i"
        :settings="item.props"
      ></ModifyWidgetProperties>
      <component
        :is="widgetManager.getComponent(item.widgetID)"
        v-bind="item.props"
        :key="item.props"
      ></component>
    </GridItem>
  </GridLayout>
</template>

<script lang="ts">
import { inject, defineComponent } from "vue";
import { GridItem, GridLayout } from "vue-ts-responsive-grid-layout";
import { LayoutWidget, WidgetManager } from "../types";
import ModifyWidgetProperties from "./Widgets/Modify.vue";

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
    ModifyWidgetProperties,
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
      window,
    };
  },
});
</script>

<style>
/* .vue-grid-item .resizing[data-v-0e7da41e] {
  opacity: 0.9;
}
.vue-grid-item[data-v-0e7da41e] {
  box-sizing: border-box;
  color: #fff;
  cursor: default;
  font-size: 1rem;
  touch-action: none;
  transition: all 0.2s ease;
  transition-property: left, top, right;
}
.vue-grid-item[data-v-0e7da41e]:hover {
  border: solid 1px #000;
}
.vue-grid-item.vue-static[data-v-0e7da41e] {
  background-color: #393d42;
}
.vue-grid-item.no-touch[data-v-0e7da41e] {
  touch-action: none;
}
.vue-grid-item.vue-use-radius[data-v-0e7da41e] {
  border-radius: 12px;
}
.vue-grid-item.cssTransforms[data-v-0e7da41e] {
  left: auto;
  right: auto;
  transition-duration: 0.4s;
  transition-property: transform;
}
.vue-grid-item.resizing[data-v-0e7da41e] {
  opacity: 0.6;
  z-index: 3;
}
.vue-grid-item.vue-grid-placeholder[data-v-0e7da41e] {
  background: #8f3c3c;
  opacity: 0.5;
  transition-duration: 0.1s;
  user-select: none;
  z-index: 2;
}
.vue-grid-item.disable-user-select[data-v-0e7da41e] {
  user-select: none;
} */

/**
 * Resizable
 */
/* .vue-grid-item > .vue-resizable-handle[data-v-0e7da41e] {
  background-origin: content-box;
  background-position: bottom right;
  background-repeat: no-repeat;
  bottom: -3px;
  box-sizing: border-box;
  cursor: se-resize;
  height: 15px;
  padding: 0 3px 3px 0;
  position: absolute;
  right: -3px;
  width: 15px;
  z-index: 5;
}
.vue-grid-item > .vue-resizable-handle > .icon[data-v-0e7da41e] {
  box-sizing: border-box;
  display: inline-block;
  font-size: inherit;
  font-style: normal;
  height: 1em;
  position: relative;
  text-indent: -9999px;
  vertical-align: middle;
  width: 1em;
}
.vue-grid-item > .vue-resizable-handle > .icon[data-v-0e7da41e]:before,
.vue-grid-item > .vue-resizable-handle > .icon[data-v-0e7da41e]:after {
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
.vue-grid-item
  > .vue-resizable-handle
  > .icon.icon-resize-se[data-v-0e7da41e]:before {
  border-bottom: 0;
  border-right: 0;
  height: 0.65em;
  transform: translate(-75%, -50%) rotate(180deg);
  width: 0.65em;
}
.vue-grid-item > .vue-rtl-resizable-handle[data-v-0e7da41e] {
  background-origin: content-box;
  background-position: bottom right;
  background-repeat: no-repeat;
  bottom: 5px;
  box-sizing: border-box;
  cursor: sw-resize;
  height: 20px;
  left: 0;
  margin: 0 3px 2px 5px;
  position: absolute;
  right: auto;
  width: 20px;
  z-index: 5;
}
.vue-grid-item > .vue-rtl-resizable-handle > .icon[data-v-0e7da41e],
.vue-grid-item > .vue-rtl-resizable-handle .icon-resize-se[data-v-0e7da41e] {
  box-sizing: border-box;
  display: inline-block;
  font-size: inherit;
  font-style: normal;
  height: 1em;
  position: relative;
  text-indent: -9999px;
  vertical-align: middle;
  width: 1em;
}
.vue-grid-item > .vue-rtl-resizable-handle > .icon[data-v-0e7da41e]:before,
.vue-grid-item > .vue-rtl-resizable-handle > .icon[data-v-0e7da41e]:after,
.vue-grid-item
  > .vue-rtl-resizable-handle
  .icon-resize-se[data-v-0e7da41e]:before,
.vue-grid-item
  > .vue-rtl-resizable-handle
  .icon-resize-se[data-v-0e7da41e]:after {
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
.vue-grid-item
  > .vue-rtl-resizable-handle
  > .icon.icon-resize-se[data-v-0e7da41e]:before,
.vue-grid-item
  > .vue-rtl-resizable-handle
  .icon-resize-se.icon-resize-se[data-v-0e7da41e]:before {
  border-bottom: 0;
  border-right: 0;
  height: 0.65em;
  transform: translate(-75%, -50%) rotate(270deg);
  width: 0.65em;
} */

/** Close Button */
/* .vue-grid-item.render-rtl > .btn-close[data-v-0e7da41e] {
  align-items: center;
  background: red;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  height: 24px;
  justify-content: center;
  left: 4px !important;
  margin: 0;
  padding: 0;
  position: absolute;
  right: auto !important;
  top: 4px;
  transition: all 0.15s;
  width: 24px;
  z-index: 5;
}
.vue-grid-item.render-rtl > .btn-close > .icon-cross[data-v-0e7da41e] {
  background: none;
  border: 0;
  height: 16px;
  margin: 0;
  padding: 0;
  position: relative;
  width: 16px;
}
.vue-grid-item.render-rtl > .btn-close > .icon-cross[data-v-0e7da41e]:after,
.vue-grid-item.render-rtl > .btn-close > .icon-cross[data-v-0e7da41e]:before {
  background: #fff;
  border-radius: 4px;
  content: "";
  height: 4px;
  left: 0;
  position: absolute;
  right: 0;
  top: 6px;
}
.vue-grid-item.render-rtl > .btn-close > .icon-cross[data-v-0e7da41e]:before {
  transform: rotate(45deg);
}
.vue-grid-item.render-rtl > .btn-close > .icon-cross[data-v-0e7da41e]:after {
  transform: rotate(-45deg);
}
.vue-grid-item.render-rtl > .btn-close > .icon-cross span[data-v-0e7da41e] {
  display: block;
}
.vue-grid-item.render-rtl > .btn-close[data-v-0e7da41e]:hover,
.vue-grid-item.render-rtl > .btn-close[data-v-0e7da41e]:focus {
  background: #1481b4;
  transform: rotate(90deg);
}
.vue-grid-item > .btn-close[data-v-0e7da41e] {
  align-items: center;
  background: red;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  height: 24px;
  justify-content: center;
  left: auto;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 4px;
  top: 4px;
  transition: all 0.15s;
  width: 24px;
  z-index: 5;
}
.vue-grid-item > .btn-close > .icon-cross[data-v-0e7da41e] {
  background: none;
  border: 0;
  height: 16px;
  margin: 0;
  padding: 0;
  position: relative;
  width: 16px;
}
.vue-grid-item > .btn-close > .icon-cross[data-v-0e7da41e]:after,
.vue-grid-item > .btn-close > .icon-cross[data-v-0e7da41e]:before {
  background: #fff;
  border-radius: 4px;
  content: "";
  height: 4px;
  left: 0;
  position: absolute;
  right: 0;
  top: 6px;
}
.vue-grid-item > .btn-close > .icon-cross[data-v-0e7da41e]:before {
  transform: rotate(45deg);
}
.vue-grid-item > .btn-close > .icon-cross[data-v-0e7da41e]:after {
  transform: rotate(-45deg);
}
.vue-grid-item > .btn-close > .icon-cross span[data-v-0e7da41e] {
  display: block;
}
.vue-grid-item > .btn-close[data-v-0e7da41e]:hover,
.vue-grid-item > .btn-close[data-v-0e7da41e]:focus {
  background: #1481b4;
  transform: rotate(90deg);
}
.btn-close[data-v-e7241dbc] {
  align-items: center;
  background: #464548;
  border: 0;
  border-radius: 50%;
  cursor: pointer !important;
  display: flex;
  flex-flow: column nowrap;
  height: 40px;
  justify-content: center;
  margin: 0;
  padding: 0;
  transition: all 0.15s;
  width: 40px;
}
.btn-close .icon-cross[data-v-e7241dbc] {
  background: none;
  border: 0;
  height: 20px;
  margin: 0;
  padding: 0;
  position: relative;
  width: 20px;
}
.btn-close .icon-cross[data-v-e7241dbc]:before,
.btn-close .icon-cross[data-v-e7241dbc]:after {
  background: #fff;
  border-radius: 6px;
  content: "";
  height: 6px;
  left: 0;
  position: absolute;
  right: 0;
  top: 7px;
}
.btn-close .icon-cross[data-v-e7241dbc]:before {
  transform: rotate(45deg);
}
.btn-close .icon-cross[data-v-e7241dbc]:after {
  transform: rotate(-45deg);
}
.btn-close .icon-cross span[data-v-e7241dbc] {
  display: block;
}
.btn-close[data-v-e7241dbc]:hover,
.btn-close[data-v-e7241dbc]:focus {
  transform: rotate(90deg);
} */
/** Unsure */
/* .vue-grid-layout[data-v-79ff33a6] {
  position: relative;
  transition: height 0.2s ease;
}
.grid[data-v-79ff33a6]:before {
  content: "";
  background-size: calc((100% - 10px) / 6) 70px;
  background-image: linear-gradient(to right, #000 1px, transparent 1px),
    linear-gradient(to bottom, #000 1px, transparent 1px);
  height: calc(100% - 5px);
  width: calc(100% - 5px);
  position: absolute;
  background-repeat: repeat;
  margin: 5px;
} */

/* .vue-draggable-handle[data-v-f557b34e] {
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat bottom right;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
  height: 20px;
  left: 0;
  padding: 0 8px 8px 0;
  position: absolute;
  top: 0;
  width: 20px;
} */

/**
 *
 */

.visually-hidden {
  display: none;
}

.btn-close {
  height: 24px;
  position: absolute;
  right: 3px;
  top: 3px;
  width: 24px;
  z-index: 20;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>') !important;
}

.icon icon-cross {
  background-image: linear-gradient(to right, black 1px, transparent 1px),
    linear-gradient(to bottom, black 1px, transparent 1px);
}

/* .vue-grid-item {
  touch-action: none;
  display: block !important;
} */

.vue-close-button:hover {
  cursor: pointer;
  filter: brightness(0) invert(1);
  opacity: 0.8;
}

.vue-grid-layout {
  position: inherit !important;
  z-index: 0;
}

div {
  position: relative;
}
</style>
