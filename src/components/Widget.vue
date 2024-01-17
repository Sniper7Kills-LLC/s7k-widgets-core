<template>
  <ModifyWidgetProperties v-if="inEditMode" :widgetId="widgetId" :settings="settings">
    <template #settings="{ widgetSettings, widgetId }">
      <!-- Use the content passed through the 'settings' slot -->
      <slot name="settings" :widgetSettings="widgetSettings" :widgetId="widgetId" />
    </template>
  </ModifyWidgetProperties>
  <slot />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ModifyWidgetProperties from './Widgets/Modify.vue'

export default defineComponent({
  name: 'WidgetInterface',
  components: {
    ModifyWidgetProperties
  },
  props: {
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
  }
})
</script>
