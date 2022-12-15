<template>
  <footer :class="theme">
    <div :class="themeLogo"></div>
    <div class="contact-us-container">
      <p>Contact Us</p>
      <p>Calle Falsa, 123</p>
    </div>
  </footer>
</template>

<script setup>
import { useThemeStore } from "../stores/theme";
import { computed } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const theme = computed(() => {
  return userStore.theme === "light" ? "footer-light" : "footer-dark";
});

const themeLogo = computed(() => {
  return userStore.theme === "light" ? "footer-logo-light" : "footer-logo-dark";
});
</script>
