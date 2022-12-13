<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="jesus-sign">
    <div class="header">
      <div class="header-container">
        <h3 class="header-title">Login Quest toy App</h3>
        <p class="header-subtitle">Make your world your own quest log!</p>
      </div>
    </div>

    <div class="container">
      <div class="big-green-box"></div>
      <section class="sign-in-form">
        <h3 class="create-title">Log In to Questy App</h3>
        <div class="sign-up-container">
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

              <button class="sign-button" type="submit">Sign In</button>
            </div>
          </form>
        </div>
        <p class="account-question" id="question-login">
          Dont have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-link"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";
import Footer from "../components/Footer.vue";

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
