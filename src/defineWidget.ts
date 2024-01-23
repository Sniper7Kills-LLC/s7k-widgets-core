import type { Prop, ComponentObjectPropsOptions } from 'vue'

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
  },
  content: {
    type: Object,
    default: () => {
      return {}
    }
  }
}

interface PropOptions<T = any, D = T> {
  type?: any
  required?: boolean
  default?: any
}

type RequiredWidgetProps = ComponentObjectPropsOptions & {
  inEditMode: PropOptions
  widgetId: PropOptions
  settings: PropOptions
}

type DefaultWidgetComponent = {
  props: RequiredWidgetProps
}

export default {
  props: props
} as DefaultWidgetComponent
