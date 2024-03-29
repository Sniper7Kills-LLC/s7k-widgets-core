import { reactive } from 'vue'
import type { LayoutManager, LayoutPage, LayoutWidget, LayoutGrid } from '@/types'
import { v4 as uuidv4 } from 'uuid'

const defaultLayout: LayoutPage = {
  id: uuidv4(),
  page: 'default',
  name: 'default',
  default: false,
  grid: {
    id: uuidv4(),
    items: [
      {
        name: 'Empty Widget',
        widgetID: 'd287d3bc-94e9-4b6d-91ce-ef4bfced75ff',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        i: uuidv4()
      }
    ]
  },
  hasTabs: true,
  tabs: [
    {
      id: uuidv4(),
      name: 'Empty Tab',
      grid: {
        id: uuidv4(),
        items: [
          {
            name: 'Empty Widget',
            widgetID: 'd287d3bc-94e9-4b6d-91ce-ef4bfced75ff',
            x: 0,
            y: 0,
            w: 1,
            h: 1,
            i: uuidv4()
          }
        ]
      }
    }
  ]
}

const layoutManager: LayoutManager = reactive({
  currentPage: 'index',
  defaultLayouts: [] as LayoutPage[] | null,
  savedLayouts: [] as LayoutPage[],
  currentTab: 0,
  currentLayout: {
    id: uuidv4(),
    page: 'default',
    name: 'default',
    default: false,
    grid: {
      id: uuidv4(),
      items: []
    },
    hasTabs: false,
    tabs: []
  } as LayoutPage,
  colCount: 3,

  setPage(page, defaultLayouts = null) {
    this.load()

    this.currentPage = page
    //this.defaultLayouts = defaultLayouts;
    this.defaultLayouts = defaultLayouts ? [...defaultLayouts] : null
    this.currentTab = 0

    // TODO Set to a user-defined default
    this.setLayout(this.getDefaultLayout())
  },

  setLayout(id: number | string) {
    let layout = null
    this.currentTab = 0

    // Saved Layouts
    const savedLayoutIndex = this.savedLayouts.findIndex((value: LayoutPage) => value.id === id)

    if (savedLayoutIndex !== -1) {
      layout = { ...this.savedLayouts[savedLayoutIndex] }
    }

    if (this.defaultLayouts === null) {
      console.log('No Default Layouts')
      return
    }

    const defaultLayoutIndex = this.defaultLayouts.findIndex((value: LayoutPage) => value.id === id)

    if (defaultLayoutIndex !== -1 && layout === null) {
      layout = { ...this.defaultLayouts[defaultLayoutIndex] }
    }

    if (layout === null) {
      console.log('No Layout')
      return
    }
    this.currentTab = 0
    this.currentLayout = JSON.parse(JSON.stringify(layout))
  },

  setDefaultLayout(id: number | string): void {
    this.savedLayouts = this.savedLayouts.map((layout) => {
      if (layout.page === this.currentPage) {
        layout.default = false
        if (layout.id === id) {
          layout.default = true
        }
      }
      return layout
    })
    this.save()
  },

  addLayout(layout) {
    if (this.savedLayouts.findIndex((sLayout) => sLayout.id == layout.id) > -1) {
      console.log('Layout Already Exists!')
      return
    }

    this.savedLayouts.push(layout)
    this.save()
  },

  getDefaultLayout(): number | string {
    const defaultSavedLayout = this.savedLayouts.find((layout) => {
      return layout.page === this.currentPage && layout.default === true
    })
    if (defaultSavedLayout != null) return defaultSavedLayout.id

    if (this.defaultLayouts === null) return 0

    return this.defaultLayouts[0].id
  },

  getGrid(gridID: number | string): LayoutGrid | null {
    if (this.currentLayout.grid.id === gridID) return this.currentLayout.grid

    const tabIndex = this.currentLayout.tabs.findIndex((tab) => {
      return tab.grid.id === gridID
    })
    //console.log(tabIndex);
    if (tabIndex > -1) return this.currentLayout.tabs[tabIndex].grid

    return null
  },

  getLayoutNames() {
    const savedLayouts = this.savedLayouts
      .filter((value: LayoutPage) => value.page === this.currentPage)
      .map((layout) => ({
        id: layout.id,
        name: layout.name
      }))

    const defaultLayouts = this.defaultLayouts
      ? this.defaultLayouts.map((layout) => ({
          id: layout.id,
          name: 'Default - ' + layout.name
        }))
      : []

    return [...savedLayouts, ...defaultLayouts]
  },

  createLayout(name) {
    const layout = defaultLayout
    layout.name = name
    layout.id = uuidv4()
    layout.page = this.currentPage
    this.savedLayouts.push(layout)
    this.save()
    this.setLayout(layout.id)
  },

  createTab(name) {
    this.currentLayout.tabs.push({
      id: uuidv4(),
      name: name,
      grid: {
        id: uuidv4(),
        items: [
          {
            name: 'Empty Widget',
            widgetID: 'd287d3bc-94e9-4b6d-91ce-ef4bfced75ff',
            x: 0,
            y: 0,
            w: 1,
            h: 1,
            i: uuidv4()
          }
        ]
      }
    })
    this.save()
    this.currentTab = this.currentLayout.tabs.length - 1
  },

  updateLayout(layout) {
    this.currentLayout = JSON.parse(JSON.stringify(layout))
    this.save()
  },

  updateGrid(items, gridID) {
    const grid = this.getGrid(gridID)

    if (grid == null || !grid.items) return

    if (grid.items.length > 0) {
      grid.items = items
    } else {
      grid.items = [
        {
          name: 'Empty Widget',
          widgetID: 'd287d3bc-94e9-4b6d-91ce-ef4bfced75ff',
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: uuidv4()
        }
      ]
    }
    this.save()
  },

  // updateTab(layout) {
  //   if (layout.grid.items.length == 0) {
  //     layout.grid.items = [
  //       {
  //         name: "Empty Widget",
  //         widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
  //         x: 0,
  //         y: 0,
  //         w: 1,
  //         h: 1,
  //         i: uuidv4(),
  //       },
  //     ];
  //   }

  //   this.currentLayout.tabs[this.currentTab] = layout;
  //   this.save();
  // },

  addWidgetToGrid: function (widget: LayoutWidget, gridID: number | string): void {
    const grid = this.getGrid(gridID)
    if (grid === null) return

    const updatedWidget = this.findNextSlot(widget, grid.items)
    if (updatedWidget != null) grid.items.push(updatedWidget)
    this.save()
  },
  // addWidgetToTab: function (widget: LayoutWidget): void {
  //   const updatedWidget = this.findNextSlot(
  //     widget,
  //     this.currentLayout.tabs[this.currentTab].grid.items
  //   );
  //   if (updatedWidget != null)
  //     this.currentLayout.tabs[this.currentTab].grid.items.push(updatedWidget);
  //   this.save();
  // },

  deleteTab(id: number | string): void {
    const index = this.currentLayout.tabs.findIndex((tab) => tab.id === id)

    if (index !== -1) {
      // Tab found
      console.log('Tab Found')
      if (this.currentTab == index) {
        // Currently viewing that tab
        console.log('Need To Change Current Tab')
        this.currentTab = this.currentTab - 1 > 0 ? this.currentTab - 1 : 0
      }
      console.log('Delete Tab')
      // remove it
      this.currentLayout.tabs.splice(index, 1)
      this.save()
    }
  },

  deleteLayout(id: number | string): void {
    const index = this.savedLayouts.findIndex((layout) => layout.id === id)

    // We didn't find the layout in saved layouts. Nothing to do
    if (index == -1) return

    this.currentTab = 0

    const isDefault = this.savedLayouts[index].default
    if (index !== -1) {
      // Tab found, remove it
      this.savedLayouts.splice(index, 1)
      this.setLayout(this.getDefaultLayout())
    }
    if (isDefault && this.defaultLayouts != null) {
      this.setLayout(this.defaultLayouts[0].id)
    }

    /**
     * This is stupid.
     * For some reason if savedLayouts is an empty list
     * save() does not properly update the local storage
     * so; we need to manually do this.
     */
    if (this.savedLayouts.length > 0) this.save()
    else localStorage.setItem('$widgetLayouts', JSON.stringify([]))
  },

  findNextSlot(widget: LayoutWidget, grid: LayoutWidget[]): LayoutWidget | null {
    const numColumns = 3

    grid.sort((a, b) => a.y - b.y || a.x - b.x)

    // Helper function to check if a location is available for the new object
    function isLocationAvailable(x: number, y: number, w: number, h: number): boolean {
      for (const item of grid) {
        if (
          !(x + w <= item.x || x >= item.x + item.w) &&
          !(y + h <= item.y || y >= item.y + item.h)
        ) {
          return false // Overlapping with an existing item
        }
      }
      return true // Location is available
    }

    // Iterate through possible locations to find a suitable one
    for (let y = 0; y <= Math.max(...grid.map((item) => item.y + item.h), 0); y++) {
      for (let x = 0; x <= numColumns - widget.w; x++) {
        if (isLocationAvailable(x, y, widget.w, widget.h)) {
          widget.x = x
          widget.y = y
          return widget // Found a suitable location
        }
      }
    }

    return null // Unable to find a suitable location

    // // Check for overlap
    // while (
    //   attempts <= numOfAttempts &&
    //   grid.some((item) => {
    //     const itemXEnd = item.x + item.w;
    //     const itemYEnd = item.y + item.h;
    //     console.log(`IXS: ${item.x}, IYS: ${item.y}`);
    //     console.log(`IXE: ${itemXEnd}, IYE: ${itemYEnd}`);

    //     const widgetXEnd = widget.x + widget.w;
    //     const widgetYEnd = widget.y + widget.h;
    //     console.log(`WXS: ${widget.x}, WYS: ${widget.y}`);
    //     console.log(`WXE: ${widgetXEnd}, WYE: ${widgetYEnd}`);

    //     const isXOverlap = widget.x < itemXEnd && widgetXEnd > item.x;
    //     const isYOverlap = widget.y < itemYEnd && widgetYEnd > item.y;

    //     console.log(`WX: ${widget.x}, WY: ${widget.y}`);
    //     console.log(`X: ${isXOverlap}, Y: ${isYOverlap}`);
    //     // if (isXOverlap || isYOverlap) {
    //     //   console.log(item);
    //     // }

    //     return (isXOverlap && !isYOverlap) || (isYOverlap && !isXOverlap);
    //   })
    // ) {
    //   // Move to the next slot
    //   widget.x += 1;
    //   if (widget.x >= this.colCount) {
    //     widget.x = 0;
    //     widget.y += 1;
    //   }
    //   attempts += 1;
    // }
    // if (attempts < numOfAttempts) {
    //   console.log(`Final position: x: ${widget.x}, y: ${widget.y}`);
    //   return widget;
    // }
    // return null;
  },

  updateWidgetSettings(id, settings) {
    // Check if in Grid
    const gridWidgetIndex = this.currentLayout.grid.items.findIndex((value) => value.i === id)
    // check if In Tab
    const tabWidgetIndex = this.currentLayout.tabs[this.currentTab].grid.items.findIndex(
      (value) => value.i === id
    )

    // Update Accordingly
    if (gridWidgetIndex !== -1) {
      // Update settings for a widget in the main grid
      const foundWidget = this.currentLayout.grid.items[gridWidgetIndex]
      foundWidget.props = settings
    } else if (tabWidgetIndex !== -1) {
      // Update settings for a widget in the current tab's grid
      const foundWidget = this.currentLayout.tabs[this.currentTab].grid.items[tabWidgetIndex]
      foundWidget.props = settings
    }

    this.save()
  },

  save() {
    const savedLayoutIndex = this.savedLayouts.findIndex(
      (layout) => layout.id === this.currentLayout.id
    )

    // Layout found, update it
    if (savedLayoutIndex !== -1) {
      this.savedLayouts[savedLayoutIndex] = this.currentLayout
      localStorage.setItem('$widgetLayouts', JSON.stringify(this.savedLayouts))
      return
    }

    if (this.defaultLayouts === null) {
      console.log('No Default Layouts')
      return
    }

    // Layout Not Found
    const defaultLayoutIndex = this.defaultLayouts.findIndex(
      (layout) => layout.id === this.currentLayout.id
    )

    // This is a Default Layout Duplicate and Save
    if (defaultLayoutIndex !== -1) {
      const defaultLayout = this.defaultLayouts[defaultLayoutIndex]

      /**
       * TODO:
       * Fix this code
       * Currently the changes to widgets is duplicated to the defaultLayouts and isn't static.
       * As such we are only able to identify when a widget is added/removed.
       */
      const dHash = JSON.stringify(defaultLayout).toString()
      const cHash = JSON.stringify(this.currentLayout).toString()
      // console.log(dHash);
      // console.log(cHash);
      if (dHash === cHash) {
        //console.log("Layouts are the same");
        return
      }

      this.currentLayout.id = uuidv4()
      this.currentLayout.page = this.currentPage
      this.currentLayout.name = 'Custom - ' + this.currentLayout.name
      this.currentLayout.default = this.getDefaultLayout() == defaultLayout.id
      this.savedLayouts.push(this.currentLayout)
      localStorage.setItem('$widgetLayouts', JSON.stringify(this.savedLayouts))
      return
    }

    localStorage.setItem('$widgetLayouts', JSON.stringify(this.savedLayouts))
  },

  load() {
    const data = localStorage.getItem('$widgetLayouts')
    if (data != null) {
      this.savedLayouts = JSON.parse(data)
    }
  }
})

export default layoutManager
