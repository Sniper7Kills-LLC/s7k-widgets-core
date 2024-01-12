<template>
  <WidgetsPage page="test-page" :default-layouts="layouts"></WidgetsPage>
</template>

<script setup lang="ts">
import { LayoutPage } from "../types";

const layouts: LayoutPage[] = [
  {
    id: "0000-000-000-0000",
    name: "Test Page",
    default: false,
    grid: [
      {
        name: "Empty Widget",
        widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        i: 0,
      },
      {
        name: "Empty Widget",
        widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
        x: 1,
        y: 0,
        w: 1,
        h: 1,
        i: 1,
      },
      {
        name: "Empty Widget",
        widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
        x: 0,
        y: 1,
        w: 3,
        h: 1,
        i: 2,
      },
      {
        name: "Empty Widget",
        widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
        x: 2,
        y: 0,
        w: 1,
        h: 1,
        i: 3,
      },
    ],
    hasTabs: true,
    tabs: [
      {
        id: "0",
        name: "Example Tab 1",
        grid: [
          {
            name: "Divider",
            widgetID: "a6d8771b-2eef-4ae7-a61a-cd28a6ab4e3b",
            x: 0,
            y: 0,
            w: 1,
            h: 1,
            i: 0,
            props: { label: "Tab 1 - Divider 0" },
          },
          {
            name: "Empty Widget",
            widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
            x: 2,
            y: 0,
            w: 1,
            h: 1,
            i: 2,
          },
          {
            name: "Divider",
            widgetID: "a6d8771b-2eef-4ae7-a61a-cd28a6ab4e3b",
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
        id: "1",
        name: "Example Tab 2",
        grid: [
          {
            name: "Empty Widget",
            widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
            x: 0,
            y: 0,
            w: 1,
            h: 1,
            i: 0,
          },
          {
            name: "Empty Widget",
            widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
            x: 1,
            y: 0,
            w: 1,
            h: 1,
            i: 1,
          },
        ],
      },
    ],
  } as LayoutPage,
];
</script>

<style></style>
