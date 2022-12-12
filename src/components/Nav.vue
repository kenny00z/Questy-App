<template>
  <nav>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    <div class="menu-burger-container">
      <input type="checkbox" id="burger-menu" />
      <label class="burger-label" for="burger-menu">☰</label>
      <ul class="burger-container">
        <li class="">
          <router-link class="router-link" to="/"> Home </router-link>
        </li>
        <li class="">
          <router-link class="router-link" to="/">Task Manager</router-link>
        </li>
        <li class="">
          <router-link class="router-link" to="/account"
            >Your Account</router-link
          >
        </li>
      </ul>
    </div>
    <div class="log-out-container">
      <div>
        <p class="salute">Welcome {{ name }}</p>
      </div>
      <div>
        <button @click="signOut" class="log-out-button">Log out</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;
const errorMsg = ref("");

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    await useUserStore().signOut();
    // call the user store and send the users info to backend to signOut
    redirect.push({ path: "/auth/login" });
    // then redirect user to the homeView
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
