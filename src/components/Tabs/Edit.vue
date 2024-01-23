<template>
  <PVDialog
    :visible="open"
    @update:visible="updateOpen"
    modal
    header="Edit Tabs"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <PVTabView>
      <PVTabPanel header="Add/Remove">
        <p>Rename Tabs</p>
        <ul v-if="tabs && tabs.length > 0">
          <li v-for="tab in tabs">
            <div class="flex">
              <PVInputText class="w-full my-1" v-model="tab.name" />
              <PVButton icon="pi pi-times" label="Delete Tab" text @click="deleteTab(tab.id)" />
            </div>
          </li>
        </ul>
        <p v-else>No Tabs.</p>
        <hr class="my-2" />
        <p>Add Tab</p>
        <PVInputText class="w-full my-1" v-model="tabName" />
        <PVButton label="Add Tab" @click="addTab" />
      </PVTabPanel>

      <PVTabPanel header="Reorder">
        <PVOrderList v-model="tabs as any[]" listStyle="height:auto" dataKey="id">
          <template #item="{ item }">
            {{ item.name }}
          </template>
        </PVOrderList>
      </PVTabPanel>
    </PVTabView>
  </PVDialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

// Prime Vue
import PVButton from 'primevue/button'
import PVDialog from 'primevue/dialog'
import PVTabView from 'primevue/tabview'
import PVTabPanel from 'primevue/tabpanel'
import PVOrderList from 'primevue/orderlist'
import PVInputText from 'primevue/inputtext'

import { LayoutManager, LayoutTab } from '@/types'

// Our Components

export default defineComponent({
  name: 'EditTabs',
  components: {
    PVButton,
    PVDialog,
    PVTabView,
    PVTabPanel,
    PVOrderList,
    PVInputText
  },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  inject: {
    layoutManager: {
      from: '$widgetLayoutManager'
    }
  },
  emits: ['update:open'],
  methods: {
    updateOpen() {
      this.$emit('update:open', !this.open)
    },
    addTab() {
      if (this.tabName == '') return
      ;(this.layoutManager as LayoutManager).createTab(this.tabName)
      this.tabName = ''
    },
    deleteTab(id: number | string) {
      ;(this.layoutManager as LayoutManager).deleteTab(id)
      //console.log("Delete Tab");
    }
  },
  data() {
    return {
      tabs: null as LayoutTab[] | null,
      tabName: ''
    }
  },
  watch: {
    tabs: {
      handler(newTabs, oldTabs) {
        if (newTabs === null || newTabs.length === 0) return
        ;(this.layoutManager as LayoutManager).currentLayout.tabs = newTabs
        ;(this.layoutManager as LayoutManager).save()
      }
    },
    layoutManager: {
      handler(newLayoutManager: LayoutManager, oldLayoutManager: LayoutManager) {
        if (
          newLayoutManager.currentLayout.tabs == oldLayoutManager.currentLayout.tabs &&
          newLayoutManager.currentLayout.tabs == this.tabs
        )
          return

        if (newLayoutManager.currentLayout.tabs == this.tabs) return

        this.tabs = newLayoutManager.currentLayout.tabs
      },
      deep: true
    }
  }
})
</script>
