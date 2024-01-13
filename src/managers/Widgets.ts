import { ManagedWidget, WidgetManager } from "@/types";
import { reactive, markRaw } from "vue";

import BlankWidget from "@/components/Widgets/Blank.vue";

const widgetManager: WidgetManager = reactive({
  widgets: [
    markRaw({
      id: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
      name: "Empty Widget",
      as: BlankWidget,
      pages: ["default"],
    }),
  ] as ManagedWidget[], // Adjust the type based on your widget structure
  registerWidget(widget: ManagedWidget) {
    this.widgets.push(markRaw(widget));
  },
  getWidgets(page = "default") {
    return this.widgets.filter((widget: ManagedWidget) => {
      return (
        widget.pages == null ||
        widget.pages.some((pageName) => {
          const pageRegex = new RegExp(pageName);
          return pageRegex.test(page);
        })
      );
    });
  },
  getWidget: function (id: number | string): ManagedWidget {
    return this.widgets.filter((widget: ManagedWidget) => widget.id === id)[0];
  },
});

export default widgetManager;
