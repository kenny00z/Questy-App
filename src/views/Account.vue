<template>
  <Nav />
  <div class="jesus">
    <div class="user-config-container">
      <div class="user-info">
        <h2>Name: {{ name }}</h2>
        <h2>Username: {{ username }}</h2>
      </div>
      <div class="exp-bar">EXP BAR</div>
      <div>Lv.1.</div>
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
      <div class="user-config-container">
        <button class="user-config-btn" @click="configProfile">
          User config
        </button>
      </div>

      <div class="edit-config-container" v-show="editProfile">
        <label for="username">Username: </label>
        <input type="text" name="username" id="" v-model="username" />
        <br />
        <label for="name">Name: </label>
        <input type="text" name="name" id="" v-model="name" />
        <br />
        <label for="avatar_url">Avatar: </label>
        <input type="text" name="avatar_url" id="" v-model="avatar_url" />
        <br />
        <button
          class="btn-profile-changes"
          type="submit"
          @click="updateProfile"
        >
          Save changes!
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
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
