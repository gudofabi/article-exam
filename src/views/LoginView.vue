<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="username">
          Username
        </label>
        <input
          v-model="form.username"
          type="text"
          id="username"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your username"
        />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 font-medium mb-2" for="password">
          Password
        </label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        @click="handleSubmit"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
      >
        {{ loading ? "Loading" : "Log In" }}
      </button>
      <p v-if="error" class="text-red-400 text-sm py-5">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

/** Auh Store */
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const { error, loading, isAuthenticated } = storeToRefs(authStore);

const router = useRouter();

const form = reactive({
  username: "",
  password: "",
});

const handleSubmit = async () => {
  // Example handler for login
  await authStore.login(form);

  if (isAuthenticated) {
    router.push("/articles");
  }
};
</script>
