import { ManagedWidget, WidgetManager } from "@/types";
import { reactive, markRaw } from "vue";

import BlankWidget from "@/components/Widgets/Blank.vue";

const widgetManager: WidgetManager = reactive({
  widgets: [
    markRaw({
      id: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
      name: "Empty Widget",
      as: BlankWidget,
    }),
  ] as ManagedWidget[], // Adjust the type based on your widget structure
  registerWidget(widget: ManagedWidget) {
    widgetManager.widgets.push(markRaw(widget));
  },
  getWidgets() {
    return widgetManager.widgets;
  },
  getWidget: function (id: number | string): ManagedWidget {
    return this.widgets.filter((widget) => widget.id === id)[0];
  },
});

export default widgetManager;
