import { Component, DefineComponent } from "vue";
import { Widget } from "@/types";

export type ManagedWidget = Widget & {
  id: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  as: Component | DefineComponent;
};

export type WidgetManager = {
  widgets: ManagedWidget[];
  getWidgets(): ManagedWidget[];
  registerWidget(widget: ManagedWidget): void;
  getWidget(id: number | string): ManagedWidget;
};
