import { reactive } from "vue";
import { LayoutManager, LayoutPage, LayoutTab } from "../types";

const defaultLayout: LayoutPage = {
  id: generateUUID(),
  page: "default",
  name: "default",
  default: false,
  grid: [
    {
      name: "Empty Widget",
      widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      i: generateUUID(),
    },
  ],
  hasTabs: true,
  tabs: [
    {
      id: generateUUID(),
      name: "Empty Tab",
      grid: [
        {
          name: "Empty Widget",
          widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: generateUUID(),
        },
      ],
    },
  ],
};

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const layoutManager: LayoutManager = reactive({
  currentPage: "index",
  defaultLayouts: null as LayoutPage[] | null,
  savedLayouts: [] as LayoutPage[],
  currentLayout: {
    id: "0000-000-000-0000",
    page: "default",
    name: "default",
    default: false,
    grid: [],
    hasTabs: false,
    tabs: [],
  } as LayoutPage,

  setPage(page, defaultLayouts = null) {
    this.load();

    this.currentPage = page;
    this.defaultLayouts = defaultLayouts;

    // TODO Set to a user-defined default
    this.setLayout(this.getLayoutNames()[0].id);
  },

  setLayout(id: number | string) {
    // Saved Layouts
    let layout = this.savedLayouts.find((value: LayoutPage) => value.id === id);
    if (layout) {
      this.currentLayout = layout;
      // Return because we found it
      return;
    }

    // Default Layouts
    layout = this.defaultLayouts?.find((value: LayoutPage) => value.id === id);
    if (layout) {
      this.currentLayout = layout;
    } else {
      // Handle the case when the layout is not found
      console.warn(`Layout with ID ${id} not found.`);
    }
  },

  getLayoutNames() {
    const savedLayouts = this.savedLayouts
      .filter((value: LayoutPage) => value.page === this.currentPage)
      .map((layout) => ({
        id: layout.id,
        name: layout.name,
      }));

    const defaultLayouts = this.defaultLayouts
      ? this.defaultLayouts.map((layout) => ({
          id: layout.id,
          name: "Default - " + layout.name,
        }))
      : [];

    return [...savedLayouts, ...defaultLayouts];
  },

  createLayout(name) {
    const layout = defaultLayout;
    layout.name = name;
    this.savedLayouts.push(layout);
    this.save();
  },

  createTab(name) {
    this.currentLayout.tabs.push({
      id: generateUUID(),
      name: name,
      grid: [
        {
          name: "Empty Widget",
          widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: generateUUID(),
        },
      ],
    });
    this.save();
  },

  updateLayout(layout) {
    this.currentLayout = layout;
    this.save();
  },

  updateGrid(grid) {
    if (grid.length > 0) {
      this.currentLayout.grid = grid;
    } else {
      this.currentLayout.grid = [
        {
          name: "Empty Widget",
          widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: generateUUID(),
        },
      ];
    }
    this.save();
  },

  updateTab(id, layout) {
    if (layout.grid.length == 0) {
      layout.grid = [
        {
          name: "Empty Widget",
          widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: generateUUID(),
        },
      ];
    }
    const tabIndex = this.currentLayout.tabs.findIndex(
      (value: LayoutTab) => value.id === id
    );

    if (tabIndex !== -1) {
      // Update the tab at the found index
      this.currentLayout.tabs[tabIndex] = layout;
      this.save();
    }
  },

  save() {
    const savedLayoutID = this.savedLayouts.findIndex(
      (layout) => layout.id === this.currentLayout.id
    );

    if (savedLayoutID !== -1) {
      // Layout found, update it
      this.savedLayouts[savedLayoutID] = this.currentLayout;
    } else {
      // Layout not found, add it
      this.currentLayout.id = generateUUID();
      this.currentLayout.page = this.currentPage;
      this.currentLayout.name = "Custom - " + this.currentLayout.name;
      this.savedLayouts.push(this.currentLayout);
    }

    localStorage.setItem("$widgetLayouts", JSON.stringify(this.savedLayouts));
  },

  load() {
    const data = localStorage.getItem("$widgetLayouts");
    if (data != null) {
      this.savedLayouts = JSON.parse(data);
    }
  },
});

export default layoutManager;
