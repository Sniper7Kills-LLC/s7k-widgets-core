import type { ComponentPropsOptions } from 'vue'

export const props = {
  inEditMode: {
    type: Boolean,
    default: false
  },
  widgetId: {
    type: [Number, String],
    required: true
  },
  settings: {
    type: Object,
    default: () => {
      return {}
    }
  }
} satisfies ComponentPropsOptions

type DefaultWidgetComponent = {
    props: ComponentPropsOptions,
}

export default {
    props: props,
} as DefaultWidgetComponent;