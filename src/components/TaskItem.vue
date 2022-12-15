<template>
  <div class="all-task-container">
    <div class="task-container">
      <div class="task-btn-container">
        <div>
          <button class="btn-delete" @click="deleteTask"></button
          ><img
            class="trash-img"
            src="https://res.cloudinary.com/dz3wb5q87/image/upload/v1670928349/Final-yisus-project/Icons/trash_ysfu9c.png"
            alt=""
            @click="deleteTask"
          />
          <button class="btn-edit" @click="showHide"></button
          ><img
            class="pencil-img"
            src="https://res.cloudinary.com/dz3wb5q87/image/upload/v1670928349/Final-yisus-project/Icons/pencil_tttvwv.png"
            alt=""
            @click="showHide"
          />
          <button class="btn-check" @click="toogleTask"></button
          ><img
            class="check-img"
            src="https://res.cloudinary.com/dz3wb5q87/image/upload/v1670935976/Final-yisus-project/Icons/check-icon_bz7plg.png"
            alt=""
            @click="toogleTask"
          />
        </div>
        <div>
          <div
            :class="task.is_complete ? `quest-complete` : `quest-incomplete`"
          ></div>
        </div>
      </div>
      <div :class="theme" v-show="editTask">
        <input
          type="text"
          placeholder="Title"
          v-model="title"
          name="title"
          maxlength="24"
        />
        <input
          type="text"
          placeholder="Description"
          v-model="description"
          name="description"
          maxlength="48"
        />
        <button class="btn-save-edit" @click="updateTask"></button>
        <img
          class="save-edit-img"
          src="https://res.cloudinary.com/dz3wb5q87/image/upload/v1670928349/Final-yisus-project/Icons/Save_disket_xmceyc.png"
          alt=""
          @click="updateTask"
        />
      </div>
      <div class="task-text-container">
        <div class="task-text">
          <h3 class="task-title">{{ task.title }}</h3>
          <p class="task-description">{{ task.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";
import { useThemeStore } from "../stores/theme";
import { useUserStore } from "../stores/user";

const theme = computed(() => {
  return userStore.theme === "light"
    ? "edit-task-container-light"
    : "edit-task-container-dark";
});

const themeInput = computed(() => {
  return userStore.theme === "light" ? "nav-light" : "nav-dark";
});

const title = ref(props.task.title);
const description = ref(props.task.description);
const editTask = ref(false);

const showHide = () => {
  editTask.value = !editTask.value;
};

const taskStore = useTaskStore();
const userStore = useUserStore();

const props = defineProps({
  task: Object,
});

const emit = defineEmits(["deleteTask", "toogleTask", "getTasks"]);

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.

const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
  emit("deleteTask");
};

const toogleTask = async () => {
  // console.log("Estoy mandando a la store: ", props.task.is_complete);
  await taskStore.toogleTask(props.task.id, props.task.is_complete);
  emit("toogleTask");
};

const updateTask = async () => {
  showHide();
  await taskStore.refreshTask(title.value, description.value, props.task.id);
  emit("getTasks");
};
</script>

<style></style>
