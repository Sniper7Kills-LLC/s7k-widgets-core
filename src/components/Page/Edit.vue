<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton
      class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      Layout Options
    </MenuButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        style="z-index: 10 !important"
      >
        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-violet-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm'
            ]"
            @click="toggleEditMode"
          >
            {{ editMode ? 'Save' : 'Edit' }}
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-violet-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm'
            ]"
            @click="setDefaultLayout"
          >
            Set As Default
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-violet-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm'
            ]"
            @click="deleteLayout"
          >
            Delete Layout
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-violet-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm'
            ]"
            @click="importExportOpen = true"
          >
            Import/Export Layouts
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-violet-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm'
            ]"
            @click="registerWidgetOpen = true"
          >
            Register Widget
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
  <ImportExportLayout v-model:open="importExportOpen"></ImportExportLayout>
  <RegisterWidget v-model:open="registerWidgetOpen"></RegisterWidget>
</template>

<script lang="ts">
import { defineComponent, ref, watch, inject } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import RegisterWidget from '../Widgets/Register.vue'
import ImportExportLayout from '../Layout/ImportExport.vue'
import type { LayoutManager } from '@/types'

export default defineComponent({
  name: 'EditWidgetsPage',
  components: {
    RegisterWidget,
    ImportExportLayout,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editMode = ref(props.modelValue)
    const importExportOpen = ref(false)
    const registerWidgetOpen = ref(false)
    const layoutManager = inject('$widgetLayoutManager') as LayoutManager

    watch(
      () => props.modelValue,
      (newValue) => {
        editMode.value = newValue
      }
    )

    const toggleEditMode = () => {
      editMode.value = !editMode.value
      emit('update:modelValue', editMode.value)
    }

    function setDefaultLayout(): void {
      layoutManager.setDefaultLayout(layoutManager.currentLayout.id)
    }

    function deleteLayout(): void {
      layoutManager.deleteLayout(layoutManager.currentLayout.id)
    }

    return {
      editMode,
      importExportOpen,
      registerWidgetOpen,
      toggleEditMode,
      setDefaultLayout,
      deleteLayout
    }
  }
})
</script>
