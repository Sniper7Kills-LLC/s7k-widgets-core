<template>
    <PVDialog
        :visible="open"
        @update:visible="updateOpen"
        modal
        header="Layout Properties"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <div v-if="layout">
            <label for="layout_name">Layout Name</label>
            <PVInputText id="layout_name" v-model="layout.name" />

            <label for="layout_name">Tabs Enabled</label>
            <PVInputSwitch id="layout_name" v-model="layout.hasTabs" />
        </div>
        <div v-else>
            Loading...
        </div>
    </PVDialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

// Prime Vue
import PVDialog from 'primevue/dialog';
import PVInputText from 'primevue/inputtext'
import PVInputSwitch from 'primevue/inputswitch';

// Our Components
import { LayoutManager, LayoutPage } from '@/types';

export default defineComponent({
    name: 'LayoutProperties',
    components: {
        PVDialog,
        PVInputText,
        PVInputSwitch
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
    emits: [
        'update:open'
    ],
    data() {
        return {
            layout: null as LayoutPage | null
        }
    },
    watch: {
        layout: {
            handler(newLayout, oldLayout) {
                if (newLayout == null) return;

                const layoutManager = (this.layoutManager as LayoutManager);
                // Name
                if (newLayout.name != layoutManager.currentLayout.name) {
                    console.log("Name Updated");
                    layoutManager.currentLayout.name = newLayout.name
                    layoutManager.save()
                }
            },
            deep: true
        },
        layoutManager: {
            handler(newLayoutManager, oldLayoutManager) {
                if(newLayoutManager.currentLayout == oldLayoutManager.currentLayout && this.layout) return;
                if(newLayoutManager.currentLayout === this.layout) return;
                this.layout = newLayoutManager.currentLayout;
            },
            deep: true,
        }
    },
    methods: {
        updateOpen() {
            this.$emit('update:open', !this.open)
        }
    }
});
</script>