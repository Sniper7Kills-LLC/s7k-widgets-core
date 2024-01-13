<template>
  <div class="space-x-2 relative">
    <button
      class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="setDefaultLayout"
    >
      Set as Default
    </button>
    <button
      class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="deleteLayout"
    >
      Delete Layout
    </button>
    <button
      class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="toggleEditMode"
    >
      {{ editMode ? "Save" : "Edit" }}
    </button>

    <div v-if="editMode">
      <AddWidget></AddWidget>
    </div>

    <RegisterWidget></RegisterWidget>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, inject } from "vue";
import AddWidget from "../Widgets/Add.vue";
import RegisterWidget from "../Widgets/Register.vue";
import { LayoutManager } from "../../types";

export default defineComponent({
  name: "EditWidgetsPage",
  components: {
    AddWidget,
    RegisterWidget,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const editMode = ref(props.modelValue);
    const layoutManager = inject("$widgetLayoutManager") as LayoutManager;

    watch(
      () => props.modelValue,
      (newValue) => {
        editMode.value = newValue;
      }
    );

    const toggleEditMode = () => {
      editMode.value = !editMode.value;
      emit("update:modelValue", editMode.value);
    };

    function setDefaultLayout(): void {
      layoutManager.setDefaultLayout(layoutManager.currentLayout.id);
    }

    function deleteLayout(): void {
      layoutManager.deleteLayout(layoutManager.currentLayout.id);
    }

    return {
      editMode,
      toggleEditMode,
      setDefaultLayout,
      deleteLayout,
    };
  },
});
</script>
