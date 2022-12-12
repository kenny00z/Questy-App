<template>
  <div class="header">
    <div class="header-container">
      <h3 class="header-title">Register to Tasky App</h3>
      <p class="header-subtitle">Start organizing your tasks!</p>
    </div>
  </div>
  <div class="container">
    <div class="section-container">
      <h3 class="create-title">Create your account!</h3>
      <div class="sign-up-container">
        <form @submit.prevent="signUp" class="form-sign-in">
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
              <label class="input-field-label">Confirm password</label>
              <input
                type="password"
                class="input-field"
                placeholder="**********"
                id="confirmPassword"
                v-model="confirmPassword"
                required
              />
            </div>
            <button class="sign-button" type="submit">Sign Up</button>
          </div>
          <p class="account-question">
            Have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-link"
            />
          </p>
          <div v-show="errorMsg">{{ errorMsg }}</div>
        </form>
      </div>
    </div>
  </div>

  <footer></footer>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Some fail on your register";
};
</script>

<style></style>
