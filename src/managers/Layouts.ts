import { markRaw, reactive } from "vue";
import { LayoutManager, LayoutPage } from "../types";
import sha512 from "crypto-js/sha512";

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
  defaultLayouts: [] as LayoutPage[] | null,
  savedLayouts: [] as LayoutPage[],
  currentTab: 0,
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
    //this.defaultLayouts = defaultLayouts;
    this.defaultLayouts = defaultLayouts ? [...defaultLayouts] : null;
    this.currentTab = 0;

    // TODO Set to a user-defined default
    this.setLayout(this.getLayoutNames()[0].id);
  },

  setLayout(id: number | string) {
    let layout = null;

    // Saved Layouts
    const savedLayoutIndex = this.savedLayouts.findIndex(
      (value: LayoutPage) => value.id === id
    );

    if (savedLayoutIndex !== -1) {
      layout = { ...this.savedLayouts[savedLayoutIndex] };
    }

    if (this.defaultLayouts === null) {
      console.log("No Default Layouts");
      return;
    }

    const defaultLayoutIndex = this.defaultLayouts.findIndex(
      (value: LayoutPage) => value.id === id
    );

    if (defaultLayoutIndex !== -1 && layout === null) {
      layout = { ...this.defaultLayouts[defaultLayoutIndex] };
    }

    if (layout === null) {
      console.log("No Layout");
      return;
    }
    this.currentTab = 0;
    this.currentLayout = JSON.parse(JSON.stringify(layout));
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
    layout.id = generateUUID();
    layout.page = this.currentPage;
    this.savedLayouts.push(layout);
    this.save();
    this.setLayout(layout.id);
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
    this.currentTab = this.currentLayout.tabs.length - 1;
  },

  updateLayout(layout) {
    this.currentLayout = JSON.parse(JSON.stringify(layout));
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

  updateTab(layout) {
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

    this.currentLayout.tabs[this.currentTab] = layout;
    this.save();
  },

  save() {
    const savedLayoutIndex = this.savedLayouts.findIndex(
      (layout) => layout.id === this.currentLayout.id
    );

    // Layout found, update it
    if (savedLayoutIndex !== -1) {
      this.savedLayouts[savedLayoutIndex] = this.currentLayout;
      localStorage.setItem("$widgetLayouts", JSON.stringify(this.savedLayouts));
      return;
    }

    if (this.defaultLayouts === null) {
      console.log("No Default Layouts");
      return;
    }

    // Layout Not Found
    const defaultLayoutIndex = this.defaultLayouts.findIndex(
      (layout) => layout.id === this.currentLayout.id
    );

    // This is a Default Layout Duplicate and Save
    if (defaultLayoutIndex !== -1) {
      const defaultLayout = this.defaultLayouts[defaultLayoutIndex];

      /**
       * TODO:
       * Fix this code
       * Currently the changes to widgets is duplicated to the defaultLayouts and isn't static.
       * As such we are only able to identify when a widget is added/removed.
       */

      const dHash = sha512(JSON.stringify(defaultLayout)).toString();
      const cHash = sha512(JSON.stringify(this.currentLayout)).toString();
      // console.log(dHash);
      // console.log(cHash);

      if (dHash === cHash) {
        // console.log("Layouts are the same");
        return;
      }

      this.currentLayout.id = generateUUID();
      this.currentLayout.page = this.currentPage;
      this.currentLayout.name = "Custom - " + this.currentLayout.name;
      this.savedLayouts.push(this.currentLayout);
      localStorage.setItem("$widgetLayouts", JSON.stringify(this.savedLayouts));
      return;
    }

    // Will We Ever Get Here?
    console.log("Hello; I'm not sure how you got here...");
  },

  load() {
    const data = localStorage.getItem("$widgetLayouts");
    if (data != null) {
      this.savedLayouts = JSON.parse(data);
    }
  },
});

export default layoutManager;
