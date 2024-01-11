import { Component, DefineComponent } from "vue";

export type Widget = {
  name: string;
};

export type ManagedWidget = Widget & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  as: Component | DefineComponent;
};

export type WidgetManager = {
  widgets: ManagedWidget[];
  getWidgets(): ManagedWidget[];
  registerWidget(widget: ManagedWidget): void;
  getWidget(name: string): ManagedWidget;
};

export type LayoutWidget = Widget & {
  x: number;
  y: number;
  w: number;
  h: number;
  i: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
};

export type LayoutTabs = {
  name: string;
  grid: LayoutWidget[];
};

export type WidgetPageLayout = {
  name: string;
  default: boolean;
  grid: LayoutWidget[];
  hasTabs: boolean;
  tabs: LayoutTabs[];
};

export type WidgetLayoutManager = {
  layouts: WidgetPageLayout[];
  getLayouts(page: string): WidgetPageLayout[];
};
