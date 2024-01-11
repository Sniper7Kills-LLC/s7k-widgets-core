<template>
  <WidgetsPage page="test-page" :layout="layout"></WidgetsPage>
</template>

<script setup lang="ts">
import { WidgetPageLayout } from "../types";

const layout: WidgetPageLayout = {
  name: "Test Page",
  default: false,
  grid: [
    {
      name: "Empty Widget",
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      i: 0,
      props: { label: "Divier #1" },
    },
    { name: "Empty Widget", x: 1, y: 0, w: 1, h: 1, i: 1 },
    { name: "Empty Widget", x: 1, y: 1, w: 3, h: 1, i: 2 },
    { name: "Empty Widget", x: 2, y: 0, w: 1, h: 1, i: 3 },
  ],
  hasTabs: true,
  tabs: [
    {
      name: "Example Tab 1",
      grid: [
        {
          name: "Divider",
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: 0,
          props: { label: "Tab 1 - Divider 0" },
        },
        {
          name: "Empty Widget",
          x: 2,
          y: 0,
          w: 1,
          h: 1,
          i: 2,
        },
        {
          name: "Divider",
          x: 1,
          y: 0,
          w: 1,
          h: 1,
          i: 1,
          props: { label: "Tab 1 - Divider 1" },
        },
      ],
    },
    {
      name: "Example Tab 2",
      grid: [
        { name: "Empty Widget", x: 0, y: 0, w: 1, h: 1, i: 0 },
        { name: "Empty Widget", x: 1, y: 0, w: 1, h: 1, i: 1 },
      ],
    },
    {
      name: "Empty Tab",
      grid: [],
    },
  ],
};
</script>

<style></style>
