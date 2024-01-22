<template>
    <PVButton 
        type="button" 
        icon="pi pi-ellipsis-v" 
        @click="toggleMenu" 
        aria-haspopup="true" 
        aria-controls="overlay_menu"
    />
    <PVMenu
        id="overlay_menu"
        ref="menu"
        :popup="true"
        :model="menu"
    />
    <PropertiesDialog v-model:open="propertiesDialog"></PropertiesDialog>
    <TabsDialog v-model:open="tabsDialog"></TabsDialog>
    <LayoutDialog v-model:open="layoutDialog"></LayoutDialog>
    <WidgetDialog v-model:open="widgetDialog"></WidgetDialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

// PrimeVue
import PVMenu from 'primevue/menu';
import PVButton from 'primevue/button';
import { MenuItem } from 'primevue/menuitem';

// Our Stuff
import PropertiesDialog from "@/components/Page/Properties.vue"
import TabsDialog from "@/components/Tabs/Edit.vue";
import LayoutDialog from '@/components/Layout/ImportExport.vue'
import WidgetDialog from '@/components/Widgets/Register.vue'
import { LayoutManager } from '@/types';

export default defineComponent({
    name: 'EditButton',
    components: {
        PVMenu,
        PVButton,

        PropertiesDialog,
        TabsDialog,
        LayoutDialog,
        WidgetDialog,
    },
    props: {
        editMode: {
            type: Boolean,
            required: true,
        }
    },
    inject: {
        layoutManager: {
            from: '$widgetLayoutManager'
        }
    },
    emits: ['update:edit-mode'],
    data(){
        return {
            propertiesDialog: false,
            tabsDialog: false,
            layoutDialog: false,
            widgetDialog: false,
            menu: [
                {
                    label: 'Edit',
                    command: this.toggleEditMode
                },
                {
                    label: 'Set as Default',
                    command: this.setCurrentAsDefaultLayout
                },
                {
                    label: 'Edit Layout Properties',
                    command: this.togglePropertiesDialog
                },
                {
                    label: 'Edit Tabs',
                    command: this.toggleTabsDialog
                },
                {
                    label: 'Delete Layout',
                    command: this.deleteCurrentLayout
                },
                {
                    label: 'Import/Export Layouts',
                    command: this.toggleLayoutDialog
                },
                {
                    label: 'Register Widget',
                    command: this.toggleWidgetDialog
                }
            ] as MenuItem[]
        }
    },
    methods: {
        toggleMenu(event: MouseEvent) {
            if(!this.$refs.menu) return;
            (this.$refs.menu as PVMenu).toggle(event);
        },
        toggleEditMode() {
            this.menu[0].label = this.editMode ? "Edit" : "Save"
            this.$emit('update:edit-mode', !this.editMode)
        },
        setCurrentAsDefaultLayout() {
            (this.layoutManager as LayoutManager).setDefaultLayout(
                (this.layoutManager as LayoutManager).currentLayout.id
            )
        },
        deleteCurrentLayout() {
            (this.layoutManager as LayoutManager).deleteLayout(
                (this.layoutManager as LayoutManager).currentLayout.id
            )
        },
        toggleLayoutDialog() {
            this.layoutDialog = !this.layoutDialog;
        },
        toggleWidgetDialog() {
            this.widgetDialog = !this.widgetDialog;
        },
        togglePropertiesDialog() {
            this.propertiesDialog = !this.propertiesDialog;
        },
        toggleTabsDialog() {
            this.tabsDialog = !this.tabsDialog;
        }
    }
})
</script>