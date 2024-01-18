import type { ManagedWidget, WidgetManager } from '@/types'
import { reactive, markRaw } from 'vue'

import WidgetInterface from '@/components/Widget.vue'
import BlankWidget from '@/components/Widgets/Blank.vue'
import type { Component, DefineComponent } from 'vue'

const widgetManager: WidgetManager = reactive({
  widgets: [
    markRaw({
      id: 'd287d3bc-94e9-4b6d-91ce-ef4bfced75ff',
      name: 'Empty Widget',
      as: BlankWidget,
      pages: ['default']
    })
  ] as ManagedWidget[], // Adjust the type based on your widget structure
  savedWidgets: [] as ManagedWidget[],
  addUserWidget(widget: ManagedWidget) {
    if (this.savedWidgets.findIndex((savedWidget) => savedWidget.id === widget.id) > -1) return
    this.savedWidgets.push(widget)
    this.registerWidget(widget)
    this.save()
  },
  registerWidget(widget: ManagedWidget) {
    // Is this Widget Already Registered?
    if (this.widgets.findIndex((savedWidget) => savedWidget.id === widget.id) > -1) return

    this.widgets.push(markRaw(widget))

    // Were done if widget.as is not a string
    if (typeof widget.as !== 'string') return

    // Get the Widget name from the as javascript file name
    const matchResult = (widget.as as string)
      .split('/')
      .reverse()[0]
      .match(/^(.*?)\.umd/)
    const name = matchResult ? matchResult[1] : null

    // We can't find a name.
    if (!name) {
      console.error(`Error: Unable to extract name from URL ${widget.as}`)
      return
    }

    // Create a Promise to load the widget javascript via script URL or Base64
    new Promise((resolve, reject) => {
      // Create Script Tag
      const script = document.createElement('script')

      script.addEventListener('load', () => {
        //console.log('Widget.ts Loading')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolve((window as Record<string, any>)[name])
      })
      script.addEventListener('error', () => {
        reject(new Error(`Error loading ${widget.as}`))
      })

      if (widget.base64) {
        // Widget JS provided as Base64
        script.async = false
        script.text = atob(widget.base64) as string
      } else {
        // Widget JS provided as Script URL
        script.async = true
        script.src = widget.as as string
      }

      // Append it to the page.
      document.head.appendChild(script)
    })
  },
  getWidgets(page = 'default') {
    return this.widgets.filter((widget: ManagedWidget) => {
      return (
        widget.pages == null ||
        widget.pages.some((pageName) => {
          const pageRegex = new RegExp(pageName)
          return pageRegex.test(page)
        })
      )
    })
  },
  getWidget: function (id: number | string): ManagedWidget {
    return this.widgets.filter((widget: ManagedWidget) => widget.id === id)[0]
  },
  getComponent(id: number | string): Component | DefineComponent | Promise<Component | null> {
    const widget = this.getWidget(id)

    if (typeof widget.as != 'string') return widget.as

    const matchResult = (widget.as as string)
      .split('/')
      .reverse()[0]
      .match(/^(.*?)\.umd/)
    const name = matchResult ? matchResult[1] : null

    if (!name) {
      console.error(`Error: Unable to extract name from URL ${widget.as}`)
      return Promise.resolve(null)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as Record<string, any>)[name]
  },
  getInterface(): DefineComponent {
    return WidgetInterface as unknown as DefineComponent
  },
  save() {
    localStorage.setItem('$widgets', JSON.stringify(this.savedWidgets))
  },
  load() {
    const data = localStorage.getItem('$widgets')
    if (data != null) {
      this.savedWidgets = JSON.parse(data)
    }
    for (const widget of this.savedWidgets) {
      this.registerWidget(widget)
    }
  }
})

export default widgetManager
