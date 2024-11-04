<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-lg font-bold">
        <RouterLink to="/">ArchIntel</RouterLink>
      </h1>
      <nav class="space-x-4">
        <RouterLink to="/login" class="text-sm" v-if="!isAuthenticated"
          >Login</RouterLink
        >
        <template v-if="isAuthenticated" class="d-flex">
          <RouterLink to="/articles" class="text-sm">Articles</RouterLink>
          <button class="uppercase font-bold">
            ({{ authUser?.username }})
          </button>
          <button class="text-sm" @click="logout">Logout</button>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const { isAuthenticated, authUser } = storeToRefs(authStore);

const router = useRouter();

const logout = async () => {
  await authStore.logout();

  if (isAuthenticated) {
    router.push("/");
  }
};
</script>
