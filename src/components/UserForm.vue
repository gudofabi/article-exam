<template>
  <form
    @submit.prevent="submitUser"
    class="space-y-4 p-4 bg-white rounded-lg shadow-md w-full sm:w-1/2 mx-auto"
  >
    <label class="block">
      <span class="text-gray-700">First Name</span>
      <input
        v-model="form.firstname"
        type="text"
        required
        class="mt-1 block w-full border-gray-300 rounded-md"
      />
    </label>
    <label class="block">
      <span class="text-gray-700">Last Name</span>
      <input
        v-model="form.lastname"
        type="text"
        required
        class="mt-1 block w-full border-gray-300 rounded-md"
      />
    </label>
    <label class="block">
      <span class="text-gray-700">Type</span>
      <select
        v-model="form.type"
        required
        class="mt-1 block w-full border-gray-300 rounded-md"
      >
        <option value="Writer">Writer</option>
        <option value="Editor">Editor</option>
      </select>
    </label>
    <label class="block">
      <span class="text-gray-700">Status</span>
      <select
        v-model="form.status"
        required
        class="mt-1 block w-full border-gray-300 rounded-md"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </label>
    <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-lg">
      Save User
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  firstname: "",
  lastname: "",
  type: "",
  status: "",
});

function submitUser() {
  // Handle user form submission
}
</script>
