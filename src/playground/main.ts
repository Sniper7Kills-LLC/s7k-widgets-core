import { createApp } from "vue";
import App from "./App.vue";

import { WidgetsPlugin, WidgetsPluginOptions } from "../WidgetsPlugin";
import WidgetDivider from "./components/Divider.vue";

const app = createApp(App);

const WidgetsPluginOptions: WidgetsPluginOptions = {
  widgets: [{ name: "Divider", as: WidgetDivider }],
};
app.use(WidgetsPlugin, WidgetsPluginOptions);

app.mount("#app");
