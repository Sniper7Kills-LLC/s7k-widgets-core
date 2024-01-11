import { reactive } from "vue";
import { WidgetLayoutManager, WidgetPageLayout } from "../types";

const layoutManager: WidgetLayoutManager = reactive({
  layouts: [] as WidgetPageLayout[],
  getLayouts(page: string) {
    return layoutManager.layouts.filter((layout) => layout.name === page);
  },
});

export default layoutManager;
