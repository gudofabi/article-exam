<template>
  <div class="p-4 max-w-xs w-full bg-white rounded-lg shadow-md">
    <RouterLink :to="`/articles/${article.id}`">
      <img
        :src="comp_image"
        alt="Article Image"
        class="w-full h-32 object-cover rounded-t-lg"
      />
      <div class="p-2">
        <h3 class="text-lg font-bold">{{ article?.title }}</h3>
        <p class="text-sm text-gray-500">{{ article?.date }}</p>
        <span
          class="inline-block mt-2 px-2 py-1 text-xs font-medium text-white rounded-full"
          :class="
            article?.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'
          "
        >
          {{ article?.status }}
        </span>
      </div>
    </RouterLink>
    <!-- Edit Button - Only visible if status is "For Edit" -->
    <div v-if="canEditArticle" class="p-2 text-center">
      <RouterLink
        :to="`/articles/edit/${article?.id}`"
        class="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Edit
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const props = defineProps({
  article: {
    type: [Object, Array],
    required: true,
  },
});

const authStore = useAuthStore();

const comp_image = computed(() => {
  return props.article.image || "https://placehold.co/600x400";
});

const canEditArticle = computed(() => {
  const userType = authStore.userType;
  const articleStatus = props.article?.status;

  // Writer can edit only if status is "For Edit"
  if (userType === "Writer" && articleStatus === "For Edit") {
    return true;
  }

  // Editor can edit if status is "For Edit" or "Published"
  if (
    userType === "Editor" &&
    (articleStatus === "For Edit" || articleStatus === "Published")
  ) {
    return true;
  }

  // Otherwise, hide the Edit button
  return false;
});
</script>
