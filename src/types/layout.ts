import { Widget } from "@/types";

export type LayoutWidget = Widget & {
  widgetID: number | string;
  x: number;
  y: number;
  w: number;
  h: number;
  i: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
};

export type LayoutTab = {
  id: number | string;
  name: string;
  grid: LayoutWidget[];
};

export type LayoutPage = {
  id: number | string;
  page: string;
  name: string;
  default: boolean;
  grid: LayoutWidget[];
  hasTabs: boolean;
  tabs: LayoutTab[];
};

export type LayoutManager = {
  currentPage: string;
  defaultLayouts: LayoutPage[] | null;
  savedLayouts: LayoutPage[];
  currentLayout: LayoutPage;
  currentTab: number;

  setPage(page: string, defaultLayouts: LayoutPage[] | null): void;
  setLayout(id: number | string): void;

  getLayoutNames(): { id: string | number; name: string }[];

  createLayout(name: string): void;
  createTab(name: string): void;

  updateLayout(layout: LayoutPage): void;
  updateGrid(grid: LayoutWidget[]): void;
  updateTab(layout: LayoutTab): void;

  updateWidgetSettings(id: number | string, settings: object): void;

  save(): void;
  load(): void;
};
