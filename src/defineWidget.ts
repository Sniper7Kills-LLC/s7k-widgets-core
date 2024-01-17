import { defineComponent } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defineWidget = (widgetDefinition: any) => {
  // Additional props that you want to add
  const additionalProps = {
    inEditMode: {
      type: Boolean,
      default: false,
    },
    widgetId: {
      type: [Number, String],
      required: true,
    },
    settings: {
      type: Object,
      default: () => {
        return {};
      },
    },
  };
  const additionalMethods = {
    async loadWrapperComponent() {
      // Dynamically import the WrapperComponent from the NPM package
      const { default: WidgetInterface } = await import(
        "./components/Widget.vue"
      );

      return WidgetInterface;
    },
  };

  // Merge the provided widgetProps with additionalProps
  widgetDefinition.props = { ...widgetDefinition.props, ...additionalProps };
  widgetDefinition.methods = {
    ...widgetDefinition.methods,
    ...additionalMethods,
  };

  // Define the component using the mergedProps
  const newDefinition = {
    setup() {
      const render = () => {
        const templateContent = this.$slots.default
          ? this.$slots.default()
          : [];
      };
      return {
        render,
      };
    },
    template: `<div>
            You Must Define A Template For Your Widget!
        </div>`,
    ...widgetDefinition,
  };
  return defineComponent(newDefinition);
};

export default defineWidget;
