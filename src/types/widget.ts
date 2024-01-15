import { Component, DefineComponent } from "vue";
import { Widget } from "@/types";

export type ManagedWidget = Widget & {
  id: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  as: Component | DefineComponent | string;
  defaultProps?: object;
  height?: number;
  width?: number;
  pages?: string[];
  base64?: string;
};

export type WidgetManager = {
  widgets: ManagedWidget[];
  getWidgets(page: string): ManagedWidget[];
  registerWidget(widget: ManagedWidget): void;
  getWidget(id: number | string): ManagedWidget;
  getComponent(
    id: number | string
  ): Component | DefineComponent | Promise<Component | null>;
};
