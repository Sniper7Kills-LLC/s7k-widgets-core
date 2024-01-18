import { createApp } from 'vue'
import App from './App.vue'
import WidgetsDivider from "./components/Divider.vue";

import WidgetsPlugin from "../src/main";

const app = createApp(App)

const WidgetsPluginOptions: WidgetsPluginOptions = {
    widgets: [
      {
        name: "Divider",
        id: "a6d8771b-2eef-4ae7-a61a-cd28a6ab4e3b",
        as: WidgetsDivider,
        defaultProps: { label: "Divider Label" },
        width: 3,
        pages: [".*"],
      },
    //   {
    //     name: "Imported Example",
    //     id: "000-000-000-000",
    //     as: ExampleWidget,
    //     defaultProps: { message: "Default Message" },
    //     pages: [".*"],
    //   },
    ],
  };
app.use(WidgetsPlugin, WidgetsPluginOptions);

app.mount('#app')
