import type { Prop, PropType, ComponentObjectPropsOptions } from 'vue'

export const props = {
  inEditMode: {
    type: Boolean,
    default: false
  },
  widgetId: {
    type: [Number, String],
    default: 'DefaultWidgetID',
    required: true
  },
  settings: {
    type: Object as PropType<Record<string, any>>,
    default: () => {
      return {}
    }
  },
  content: {
    type: Object as PropType<Record<string, any>>,
    default: () => {
      return {}
    }
  }
}

export interface PropOptions<T = any, D = T> {
  type?: any
  required?: boolean
  default?: any
}

export type RequiredWidgetProps = ComponentObjectPropsOptions & {
  inEditMode: PropType<Boolean>,
  widgetId: PropType<Number | String>
  settings: PropType<Record<string, any>>,
  content: PropType<Record<string, any>> | any,
}

export type DefaultWidgetComponent = {
  props: RequiredWidgetProps
}

export default {
  props: props,
}
