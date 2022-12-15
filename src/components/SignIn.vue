<!-- COMPONENTE BOILERPLATE -->

<template>
  <div :class="theme">
    <div class="header">
      <div class="header-container">
        <h3 class="header-title">Login to Questy App</h3>
        <p class="header-subtitle">Make the world your own quest log!</p>
      </div>
    </div>

    <div class="container">
      <div :class="themeBox"></div>
      <section class="sign-in-form">
        <h3 class="create-title">Log In to Questy App</h3>
        <div :class="themeSignBox">
          <form @submit.prevent="signIn" class="form-sign-in">
            <div class="form">
              <div class="form-input">
                <label class="input-field-label">E-mail</label>
                <input
                  type="email"
                  class="input-field"
                  placeholder="example@gmail.com"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-input">
                <label class="input-field-label">Password</label>
                <input
                  type="password"
                  class="input-field"
                  placeholder="**********"
                  id="password"
                  v-model="password"
                  required
                />
              </div>

              <button :class="themeBtn" type="submit">Sign In</button>
            </div>
          </form>
        </div>
        <p class="account-question" id="question-login">
          Dont have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            :class="themeBtn"
          />
        </p>
        <div class="error-msg" v-show="errorMsg">{{ errorMsg }}</div>
      </section>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";
import Footer from "../components/Footer.vue";
import { useThemeStore } from "../stores/theme";

const theme = computed(() => {
  return userStore.theme === "light" ? "jesus-sign" : "jesus-sign-dark";
});

const themeBox = computed(() => {
  return userStore.theme === "light" ? "big-green-box" : "big-purple-box";
});

const themeSignBox = computed(() => {
  return userStore.theme === "light"
    ? "sign-up-container-green"
    : "sign-up-container-purple";
});

const themeBtn = computed(() => {
  return userStore.theme === "light" ? "sign-button-light" : "sign-button-dark";
});

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

const email = ref("");
const password = ref("");
const errorMsg = ref("");

const redirect = useRouter();
const userStore = useUserStore();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
    return;
  }
  errorMsg.value = "error";
};
</script>

<style></style>
