import type { Widget } from '@/types'

export type LayoutWidget = Widget & {
  widgetID: number | string
  x: number
  y: number
  w: number
  h: number
  i: number | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>
}

export type LayoutGrid = {
  id: number | string
  items: LayoutWidget[]
}

export type LayoutTab = {
  id: number | string
  name: string
  grid: LayoutGrid
}

export type LayoutPage = {
  id: number | string
  page: string
  name: string
  default: boolean
  grid: LayoutGrid
  hasTabs: boolean
  tabs: LayoutTab[]
}

export type LayoutManager = {
  currentPage: string
  defaultLayouts: LayoutPage[] | null
  savedLayouts: LayoutPage[]
  currentLayout: LayoutPage
  currentTab: number
  colCount: number

  setPage(page: string, defaultLayouts: LayoutPage[] | null): void
  setLayout(id: number | string): void
  setDefaultLayout(id: number | string): void

  addLayout(layout: LayoutPage): void

  getDefaultLayout(): number | string
  getLayoutNames(): { id: string | number; name: string }[]
  getGrid(gridID: number | string): LayoutGrid | null

  createLayout(name: string): void
  createTab(name: string): void

  updateLayout(layout: LayoutPage): void
  updateGrid(items: LayoutWidget[], gridID: string | number): void
  // updateTab(layout: LayoutTab): void;

  updateWidgetSettings(id: number | string, settings: object): void

  addWidgetToGrid(widget: LayoutWidget, gridID: number | string): void

  deleteTab(id: number | string): void
  deleteLayout(id: number | string): void

  findNextSlot(widget: LayoutWidget, grid: LayoutWidget[]): LayoutWidget | null

  save(): void
  load(): void
}
