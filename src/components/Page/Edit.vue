<template>
  <div class="space-x-2">
    <button
      class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="toggleEditMode"
    >
      {{ editMode ? "Save" : "Edit" }}
    </button>
    <div class="flex" v-if="editMode">
      <AddWidget class="flex-grow"></AddWidget>
    </div>
    <RegisterWidget></RegisterWidget>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import AddWidget from "../Widgets/Add.vue";
import RegisterWidget from "../Widgets/Register.vue";

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

    return {
      editMode,
      toggleEditMode,
    };
  },
});
</script>
