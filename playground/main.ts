import { createApp } from "vue";
import App from "./App.vue";

import { WidgetsPlugin, WidgetsPluginOptions } from "../src/WidgetsPlugin";
import WidgetDivider from "./components/Divider.vue";
import "./index.css";

import ExampleWidget from "../../vue-widget-template/src/ExampleWidget.vue";

const app = createApp(App);

const WidgetsPluginOptions: WidgetsPluginOptions = {
  widgets: [
    {
      name: "Divider",
      id: "a6d8771b-2eef-4ae7-a61a-cd28a6ab4e3b",
      as: WidgetDivider,
      defaultProps: { label: "Divider Label" },
      width: 3,
      pages: [".*"],
    },
    {
      name: "Imported Example",
      id: "000-000-000-000",
      as: ExampleWidget,
      defaultProps: { message: "Default Message" },
      pages: [".*"],
    },
  ],
};
app.use(WidgetsPlugin, WidgetsPluginOptions);

app.mount("#app");
