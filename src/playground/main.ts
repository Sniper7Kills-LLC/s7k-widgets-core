import { createApp } from "vue";
import App from "./App.vue";

import { WidgetsPlugin, WidgetsPluginOptions } from "../WidgetsPlugin";
import WidgetDivider from "./components/Divider.vue";

const app = createApp(App);

const WidgetsPluginOptions: WidgetsPluginOptions = {
  widgets: [
    {
      name: "Divider",
      id: "a6d8771b-2eef-4ae7-a61a-cd28a6ab4e3b",
      as: WidgetDivider,
    },
  ],
};
app.use(WidgetsPlugin, WidgetsPluginOptions);

app.mount("#app");
