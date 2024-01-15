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
    if (typeof widget.as !== "string") return;

    const matchResult = (widget.as as string)
      .split("/")
      .reverse()[0]
      .match(/^(.*?)\.umd/);
    const name = matchResult ? matchResult[1] : null;

    if (!name) {
      console.error(`Error: Unable to extract name from URL ${widget.as}`);
      return;
    }

    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.async = true;
      script.addEventListener("load", () => {
        resolve((window as Record<string, any>)[name]);
      });
      script.addEventListener("error", () => {
        reject(new Error(`Error loading ${widget.as}`));
      });

      if (widget.base64) {
        script.text = atob(widget.base64) as string;
      } else {
        script.async = false;
        script.src = widget.as as string;
      }

      document.head.appendChild(script);
    });
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

    if (typeof widget.as != "string") return widget.as;

    const matchResult = (widget.as as string)
      .split("/")
      .reverse()[0]
      .match(/^(.*?)\.umd/);
    const name = matchResult ? matchResult[1] : null;

    if (!name) {
      console.error(`Error: Unable to extract name from URL ${widget.as}`);
      return Promise.resolve(null);
    }
    return (window as Record<string, any>)[name];
  },
});

export default widgetManager;
