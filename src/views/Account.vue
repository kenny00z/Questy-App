<template>
  <Nav />
  <div class="user-config-container">
    <div class="user-info">
      <h2>Name: {{ name }}</h2>
      <h2>Username: {{ username }}</h2>
    </div>
    <div class="avatar-container">
      <img
        class="avatar-img"
        :src="
          avatar_url
            ? avatar_url
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
        "
        alt="Profile picture"
      />
    </div>
  </div>
  <div>
    <button @click="configProfile">User config</button>
  </div>
  <div v-show="editProfile">
    <label for="username">Username: </label>
    <input type="text" name="username" id="" v-model="username" />
    <br />
    <label for="name">Name: </label>
    <input type="text" name="name" id="" v-model="name" />
    <br />
    <label for="avatar_url">Avatar: </label>
    <input type="text" name="avatar_url" id="" v-model="avatar_url" />
    <br />
    <button type="submit" @click="updateProfile">Save</button>
  </div>
  <footer>FOOTER</footer>
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
const user_id = ref(null);

// PROFILE

const getProfile = async () => {
  await userStore.fetchUser();
  profile.value = userStore.profile;
  username.value = profile.value.username;
  avatar_url.value = profile.value.avatar_url;
  name.value = profile.value.name;
  user_id.value = profile.value.user_id;
};
getProfile();

const editProfile = ref(false);

const configProfile = () => {
  editProfile.value = !editProfile.value;
};

const updateProfile = async () => {
  await userStore.refreshProfile(
    name.value,
    username.value,
    avatar_url.value,
    user_id.value
  );
  refresh();
};

const refresh = () => {
  window.location.reload();
};
</script>

<style></style>
