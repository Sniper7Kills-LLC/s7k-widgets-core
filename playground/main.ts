import { createApp } from "vue";
import App from "./App.vue";

import { WidgetsPlugin, WidgetsPluginOptions } from "../src/WidgetsPlugin";
import WidgetDivider from "./components/Divider.vue";
import "./index.css";

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
      name: "Custom",
      id: "f634771b-2fef-4ae7-a61a-cd28b6ab4e2c",
      as: "https://gist.githack.com/sniper7kills/6b42ba3125724c5709f604e90379e18f/raw/0f0a9c529cbfb00688eee0546958a106c036273c/TestWidget.umd.min.js",
      defaultProps: { message: "Custom Message" },
      width: 1,
      pages: [".*"],
    },
  ],
};
app.use(WidgetsPlugin, WidgetsPluginOptions);

app.mount("#app");
