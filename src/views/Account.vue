<template>
  <Nav />
  <div :class="theme">
    <div class="user-config-container">
      <div class="user-info">
        <h2>Name: {{ name }}</h2>
        <h2>Username: {{ username }}</h2>
      </div>
      <img
        class="exp-bar-img"
        src="https://res.cloudinary.com/dz3wb5q87/image/upload/v1670951467/Final-yisus-project/Icons/XPBar_gkm6h6.png"
        alt=""
      />

      <div class="exp-bar-text"><p>EXP BAR</p></div>
      <div class="lvl-text">Lv.1</div>
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
        <button :class="themeBtnConfig" @click="configProfile">
          User config
        </button>
      </div>

      <div :class="themeConfigUser" v-show="editProfile">
        <label for="username">Username: </label>
        <input type="text" name="username" id="" v-model="username" />
        <br />
        <label for="name">Name: </label>
        <input type="text" name="name" id="" v-model="name" />
        <br />
        <label for="avatar_url">Avatar: </label>
        <input type="text" name="avatar_url" id="" v-model="avatar_url" />
        <br />
        <button :class="themeBtnSave" type="submit" @click="updateProfile">
          Save changes!
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { onMounted, ref, toRefs, computed } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import { useThemeStore } from "../stores/theme";

const theme = computed(() => {
  return userStore.theme === "light" ? "jesus" : "jesus-dark";
});

const themeBtnConfig = computed(() => {
  return userStore.theme === "light"
    ? "user-config-btn-light"
    : "user-config-btn-dark";
});

const themeBtnSave = computed(() => {
  return userStore.theme === "light"
    ? "btn-profile-changes-light"
    : "btn-profile-changes-dark";
});

const themeConfigUser = computed(() => {
  return userStore.theme === "light"
    ? "edit-config-container-light"
    : "edit-config-container-dark";
});

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
