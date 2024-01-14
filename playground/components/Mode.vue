<template>
  <div class="flex items-center justify-end">
    <button
      @click="toggleDarkMode"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Toggle Dark Mode
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModeSelector",
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle("dark", this.isDarkMode);
    },
  },
});
</script>

<style scoped>
/* Add your light mode styles here */
</style>

<style>
/* Add your dark mode styles here */
/* .dark {
  background-color: #1a1a1a;
  color: #ffffff;
} */
</style>
