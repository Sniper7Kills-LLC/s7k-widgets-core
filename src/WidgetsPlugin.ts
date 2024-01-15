import { App } from "vue";
// Global Components
import WidgetsGrid from "./components/Grid.vue";
import WidgetsPage from "./components/Page.vue";
import WidgetsTabs from "./components/Tabs.vue";
// Managers
import WidgetManager from "./managers/Widgets";
import LayoutManager from "./managers/Layouts";
import { ManagedWidget } from "./types";
import "./index.css";

// import VueDraggableGrid from "@noction/vue-draggable-grid";
// import "@noction/vue-draggable-grid/styles";
// import VueResponsiveGridLayout from "vue-ts-responsive-grid-layout";

export type WidgetsPluginOptions = {
  widgets?: ManagedWidget[]; // Adjust the type based on your widget structure
};

export const WidgetsPlugin = {
  install(app: App, options: WidgetsPluginOptions) {
    //app.use(VueResponsiveGridLayout);
    // Register the included components globally
    app.component("WidgetsGrid", WidgetsGrid);
    app.component("WidgetsPage", WidgetsPage);
    app.component("WidgetsTabs", WidgetsTabs);

    // Register widgets passed by app using plugin
    if (options.widgets && Array.isArray(options.widgets)) {
      options.widgets.forEach((widget) => {
        WidgetManager.registerWidget(widget as ManagedWidget);
      });
    }

    LayoutManager.load();
    WidgetManager.load();

    // Register the widget manager module globally
    app.provide("$widgetManager", WidgetManager);
    app.provide("$widgetLayoutManager", LayoutManager);
  },
};

export default WidgetsPlugin;
