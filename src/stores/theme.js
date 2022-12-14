import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light",
  }),
  actions: {
    toogleTheme() {
      if (this.theme === "light") this.theme = "dark";
      else this.theme = "light";
    },
  },
});
