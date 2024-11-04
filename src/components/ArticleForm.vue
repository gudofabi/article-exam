<template>
  <div class="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
    <!-- Title Field -->
    <label class="block">
      <span class="text-gray-800 font-semibold">Title</span>
      <input
        v-model="form.title"
        type="text"
        class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        placeholder="Enter article title"
      />
      <span v-if="errors.title" class="text-red-500 text-sm">{{
        errors.title
      }}</span>
    </label>

    <!-- Link Field -->
    <label class="block">
      <span class="text-gray-800 font-semibold">Link</span>
      <input
        v-model="form.link"
        type="url"
        class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        placeholder="https://example.com"
      />
      <span v-if="errors.link" class="text-red-500 text-sm">{{
        errors.link
      }}</span>
    </label>

    <!-- Image Field -->
    <label class="block">
      <span class="text-gray-800 font-semibold">Image</span>
      <input
        type="file"
        @change="uploadImage"
        class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
      />
    </label>

    <!-- Content Field -->
    <label class="block">
      <span class="text-gray-800 font-semibold">Content</span>
      <textarea
        v-model="form.content"
        rows="5"
        class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        placeholder="Write your article content here..."
      ></textarea>
      <span v-if="errors.content" class="text-red-500 text-sm">{{
        errors.content
      }}</span>
    </label>

    <!-- Buttons -->
    <button
      v-if="!forEdit"
      @click="handleSubmit"
      type="submit"
      class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
    >
      Create
    </button>
    <div v-else>
      <button
        @click="handleSubmit"
        type="submit"
        class="w-full mb-3 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Save
      </button>
      <button
        @click="publishArticle"
        type="submit"
        v-role="'Editor'"
        class="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Publish
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "@/stores/articles";
import type { Article } from "@/types/interfaces";

const articleStore = useArticleStore();
const router = useRouter();

const props = defineProps<{ formData: Article | any; forEdit: Boolean }>();

let form = reactive({ ...props.formData });
const errors = reactive({ title: "", link: "", content: "" });

// Watch for changes in props.formData to update form if needed
watch(
  () => props.formData,
  (newFormData) => {
    Object.assign(form, newFormData);
  },
  { immediate: true, deep: true }
);

// Upload Image Handler
function uploadImage(event: any) {
  form.image = event.target.files[0];
}

// Validation Function
function validateForm() {
  errors.title = form.title ? "" : "Title is required.";
  errors.link =
    form.link && isValidURL(form.link) ? "" : "A valid URL is required.";
  errors.content = form.content ? "" : "Content is required.";

  // Return true if there are no errors
  return !errors.title && !errors.link && !errors.content;
}

// URL Validation Helper
function isValidURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// Handle Form Submission
function handleSubmit() {
  if (validateForm()) {
    if (!props.forEdit) {
      saveArticle();
    } else {
      updateArticle();
    }
  }
}

// Save Article
function saveArticle() {
  articleStore
    .createArticle(form)
    .then(() => {
      router.push("/articles");
    })
    .catch(() => {
      alert("Something went wrong!");
    });
}

// Update Article
function updateArticle() {
  articleStore
    .updateArticle(form.id, form)
    .then(() => {
      router.push("/articles");
    })
    .catch(() => {
      alert("Something went wrong!");
    });
}

// Publish Article
function publishArticle() {
  const newForm = { ...form, status: "Published" };
  if (validateForm()) {
    articleStore
      .updateArticle(newForm.id, newForm)
      .then(() => {
        router.push("/articles");
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  }
}
</script>
