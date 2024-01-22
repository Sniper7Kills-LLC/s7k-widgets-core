<template>
  <ModeSelector></ModeSelector>
  <WidgetsPage page="test-page" :default-layouts="layouts"></WidgetsPage>
</template>

<script setup lang="ts">
import ModeSelector from "./components/Mode.vue";
import WidgetsPage from "../src/components/Page.vue"
import { v4 as uuidv4 } from "uuid";
import type { LayoutPage } from "../src/types";

const layouts: LayoutPage[] = [
  {
    id: uuidv4(),
    name: "Test Page",
    default: false,
    grid: {
      id: uuidv4(),
      items: [
        {
          name: "Empty Widget",
          widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: uuidv4(),
          moved: false,
        },
        {
          name: "Empty Widget",
          widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
          x: 1,
          y: 0,
          w: 1,
          h: 1,
          i: uuidv4(),
          moved: false,
        },
      ],
    },
    hasTabs: true,
    tabs: [
      {
        id: uuidv4(),
        name: "Example Tab 1",
        grid: {
          id: uuidv4(),
          items: [
            {
              name: "Divider",
              widgetID: "a6d8771b-2eef-4ae7-a61a-cd28a6ab4e3b",
              x: 0,
              y: 0,
              w: 1,
              h: 1,
              i: uuidv4(),
              props: { label: "Tab 1 - Divider 0" },
              moved: false,
            },
            {
              name: "Empty Widget",
              widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
              x: 2,
              y: 0,
              w: 1,
              h: 1,
              i: uuidv4(),
              moved: false,
            },
            {
              name: "Divider",
              widgetID: "a6d8771b-2eef-4ae7-a61a-cd28a6ab4e3b",
              x: 1,
              y: 0,
              w: 1,
              h: 1,
              i: uuidv4(),
              props: { label: "Tab 1 - Divider 1" },
              moved: false,
            },
          ],
        },
      },
      {
        id: uuidv4(),
        name: "Example Tab 2",
        grid: {
          id: uuidv4(),
          items: [
            {
              name: "Empty Widget",
              widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
              x: 0,
              y: 0,
              w: 1,
              h: 1,
              i: uuidv4(),
              moved: false,
            },
            {
              name: "Empty Widget",
              widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
              x: 1,
              y: 0,
              w: 1,
              h: 1,
              i: uuidv4(),
              moved: false,
            },
          ],
        },
      },
    ],
  } as LayoutPage,
];
</script>

<style scoped>

</style>
