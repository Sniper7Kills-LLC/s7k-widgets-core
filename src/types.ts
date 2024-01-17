import type { ManagedWidget, WidgetManager } from "./types/widget";
import type {
  LayoutWidget,
  LayoutTab,
  LayoutPage,
  LayoutManager,
  LayoutGrid,
} from "./types/layout";

export type Widget = {
  name: string;
};

export type {
  // Widget
  ManagedWidget,
  WidgetManager,
  // Layout
  LayoutWidget,
  LayoutTab,
  LayoutPage,
  LayoutManager,
  LayoutGrid,
};
