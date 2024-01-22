<template>
    <PVTabView
        :scrollable="true"
        :key="activeTab"
        :activeIndex="activeTab" 
        @update:active-index="changeTab"
    >
        <PVTabPanel 
            v-for="tab in $props.tabs" 
            :key="tab.name"
        >
            <template #header>
                {{ tab.name }}
            </template>
            <WidgetsGrid
                :layout="tab.grid"
                :inEditMode="inEditMode"
                @layout-updated="(layout: LayoutWidget[]) => gridUpdated(layout)"
            />
        </PVTabPanel>
    </PVTabView>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

// Prime Vue
import PVTabView from 'primevue/tabview';
import PVTabPanel from 'primevue/tabpanel';

// Our Stuff
import WidgetsGrid from './Grid.vue';
import { LayoutManager, LayoutTab, LayoutWidget } from '@/types';

export default defineComponent({
    name: 'WidgetTabs',
    components: {
        PVTabView,
        PVTabPanel,

        WidgetsGrid
    },
    props: {
        tabs: {
            type: Array as () => LayoutTab[],
            required: true
        },
        inEditMode: {
            type: Boolean,
            required: true
        }
    },
    inject: {
        layoutManager: {
            from: '$widgetLayoutManager'
        }
    },
    data() {
        return {
            activeTab: undefined as number | undefined,
            bypassChange: false
        }
    },
    watch: {
        activeTab: {
            handler(tabIndex: number) {
                (this.layoutManager as LayoutManager).currentTab = tabIndex;
            }
        },
        // layoutManager: {
        //     handler(layoutManager) {
        //         console.log("Layout Manager Changed")
        //         this.activeTab = (layoutManager as LayoutManager).currentTab
        //     },
        //     deep: true
        // }
    },
    methods: {
        gridUpdated(input: LayoutWidget[]) {

        },
        changeTab(id: number) {
            if(this.bypassChange){
                this.activeTab = id - 1 > 0 ? id - 1 : 0;
                this.bypassChange = false;
                return;
            }
            this.activeTab = id;
            
            (this.layoutManager as LayoutManager).currentTab = id;
        }
    }
});
</script>