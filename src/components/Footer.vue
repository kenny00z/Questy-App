<template>
  <footer :class="theme">
    <div :class="themeLogo">
      <!-- <img
        src="https://res.cloudinary.com/dz3wb5q87/image/upload/v1670971750/Final-yisus-project/Logo%20images/proyecto_logo-final-black_rgjagp.png"
        alt="footer-logo"
      /> -->
    </div>
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
