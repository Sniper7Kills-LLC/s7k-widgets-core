import { ManagedWidget, WidgetManager } from "@/types";
import { reactive, markRaw } from "vue";

import BlankWidget from "@/components/Widgets/Blank.vue";

const widgetManager: WidgetManager = reactive({
  widgets: [
    markRaw({
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
  getWidget: function (name: string): ManagedWidget {
    return this.widgets.filter((widget) => widget.name === name)[0];
  },
});

export default widgetManager;
