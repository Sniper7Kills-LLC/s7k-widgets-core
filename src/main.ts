import type { App } from 'vue'
import type { ManagedWidget } from '@/types'
import { WidgetsGrid, WidgetsPage, WidgetsTabs, WidgetInterface } from '@/components'
import { WidgetManager, LayoutManager } from '@/managers'


export type WidgetsPluginOptions = {
  widgets?: ManagedWidget[] // Adjust the type based on your widget structure
}

export default {
  install: (app: App, options: WidgetsPluginOptions = {}) => {
    app.component('WidgetsGrid', WidgetsGrid)
    app.component('WidgetsPage', WidgetsPage)
    app.component('WidgetsTabs', WidgetsTabs)
    app.component('WidgetInterface', WidgetInterface)

    // Load from options before from client storage
    if (options.widgets && Array.isArray(options.widgets)) {
      options.widgets.forEach((widget) => {
        WidgetManager.registerWidget(widget as ManagedWidget)
      })
    }

    LayoutManager.load()
    WidgetManager.load()

    app.provide('$widgetManager', WidgetManager)
    app.provide('$widgetLayoutManager', LayoutManager)
  }
}

export { default as defaultWidgetComponent } from './defineWidget'
export { WidgetInterface } from '@/components'

import type * as AllTypes from '@/types'
export { AllTypes }
