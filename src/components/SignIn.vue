<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container">
    <h3 class="header-title">Log In to ToDo App</h3>
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
        <div class="form-input">
          <button class="sign-button" type="submit">Sign In</button>
        </div>
      </div>
    </form>
    <p class="account-question">
      Dont have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-up-link"
      />
    </p>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

const email = ref("");
const password = ref("");
const errorMsg = ref("");

const redirect = useRouter();

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
