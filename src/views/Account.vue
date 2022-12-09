<template>
  <Nav />

  <h1>Name: {{ username }}</h1>

  <img
    :src="
      avatar_url
        ? avatar_url
        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
    "
    alt="Profile picture"
  />

  <div>
    <button @click="configProfile">User config</button>
  </div>
  <div v-show="editProfile">
    <label for="username">Username: </label>
    <input type="text" name="username" id="" v-model="username" />
    <br />
    <label for="name">Name: </label>
    <input type="text" name="Name" id="" />
    <br />
    <label for="avatar_url">Avatar: </label>
    <input type="text" name="avatar_url" id="" />
    <br />
    <button>Save</button>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";

const userStore = useUserStore();

const profile = ref({
  avatar_url: "",
  created_at: "",
  name: "",
  user_id: "",
  username: "",
  website: "",
});

const username = ref(null);
const avatar_url = ref(null);
const name = ref(null);

// PROFILE

const getProfile = async () => {
  await userStore.fetchUser();
  profile.value = userStore.profile;
  username.value = profile.value.username;
  avatar_url.value = profile.value.avatar_url;
  name.value = profile.value.name;
};
getProfile();

const editProfile = ref(false);

const configProfile = () => {
  editProfile.value = !editProfile.value;
};
</script>

<style>
img {
  width: 200px;

  border-radius: 50%;
}
</style>
