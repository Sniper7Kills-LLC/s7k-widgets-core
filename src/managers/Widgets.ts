import { ManagedWidget, WidgetManager } from "@/types";
import { reactive, markRaw } from "vue";

import BlankWidget from "@/components/Widgets/Blank.vue";
import { Component, DefineComponent } from "vue/dist/vue";

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
  getComponent(
    id: number | string
  ): Component | DefineComponent | Promise<Component | null> {
    const widget = this.getWidget(id);
    if (typeof widget.as !== "string") return widget.as;

    const matchResult = widget.as
      .split("/")
      .reverse()[0]
      .match(/^(.*?)\.umd/);
    const name = matchResult ? matchResult[1] : null;

    if (!name) {
      console.error(`Error: Unable to extract name from URL ${widget.as}`);
      return Promise.resolve(null);
    }

    if (name in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (window as Record<string, any>)[name] as Component;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.async = true;
      script.addEventListener("load", () => {
        if (name in window) {
          resolve(
            (window as Record<string, any>)[name] as Component | DefineComponent
          );
        } else {
          reject(new Error(`Failed to load external widget ${widget.as}`));
        }
      });
      script.addEventListener("error", () => {
        reject(new Error(`Error loading ${widget.as}`));
      });

      script.src = widget.as as string;

      document.head.appendChild(script);
    });
  },
});

export default widgetManager;
