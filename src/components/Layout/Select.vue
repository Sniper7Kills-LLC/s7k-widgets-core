<template>
  <PVDropdown
    v-model="selected"
    :options="available"
    optionLabel="name"
    optionValue="id"
    placeholder="Select a Layout"
    class="w-full md:w-[14rem]"
  />
</template>
<script lang="ts">
import { defineComponent, ref, inject, watch } from 'vue'

// PrimeVue
import PVDropdown from 'primevue/dropdown'
import { LayoutManager } from '@/types'

export default defineComponent({
  name: 'LayoutSelect',
  components: {
    PVDropdown
  },
  inject: {
    layoutManager: {
      from: '$widgetLayoutManager'
    }
  },
  data() {
    return {
      selected: null as string | number | null,
      available: [] as { id: string | number; name: string }[]
    }
  },
  watch: {
    selected: {
      handler(newSelected, oldSelected) {
        ;(this.layoutManager as LayoutManager).setLayout(newSelected)
      }
    },
    layoutManager: {
      handler(newLayoutManager: LayoutManager, oldLayoutManager: LayoutManager) {
        if (newLayoutManager.getLayoutNames() != oldLayoutManager.getLayoutNames())
          this.available = newLayoutManager.getLayoutNames()

        if (
          newLayoutManager.currentLayout.id != oldLayoutManager.currentLayout.id ||
          newLayoutManager.currentLayout.id != this.selected
        )
          this.selected = newLayoutManager.currentLayout.id
      },
      deep: true
    }
  },
  methods: {}

  // setup() {
  //     const layoutManager = inject('$widgetLayoutManager') as LayoutManager;

  //     // console.log(selected.value);

  //     // watch(
  //     //     () => layoutManager.currentLayout.id,
  //     //     () => {
  //     //         console.log("Selected Layout Changed")
  //     //         selected.value = {
  //     //             name: layoutManager.currentLayout.name,
  //     //             id: layoutManager.currentLayout.id
  //     //         };
  //     //     }
  //     // )

  //     // watch(selected, (newSelected) => {
  //     //     console.log("Selected Layout")
  //     //     if(newSelected) {
  //     //         console.log(newSelected)
  //     //         layoutManager.setLayout(newSelected.id)
  //     //     }

  //     // })

  //     return {
  //         // selected,
  //         layoutManager
  //     }
  // },
})
</script>
