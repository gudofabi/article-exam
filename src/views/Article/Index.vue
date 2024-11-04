<template>
  <main class="container mx-auto py-20">
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold">Article List</h1>
      <RouterLink
        to="/articles/create"
        v-role="'Writer'"
        class="p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >Create Article</RouterLink
      >
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
      <ArticleCard v-for="article in getArticles" :article="article" />
    </div>
  </main>
</template>
In
<script setup lang="ts">
import { onMounted } from "vue";

/** Component */
import ArticleCard from "@/components/ArticleCard.vue";

/** Article Store */
import { useArticleStore } from "@/stores/articles";
import { storeToRefs } from "pinia";

const articleStore = useArticleStore();
const { getArticles } = storeToRefs(articleStore);

onMounted(() => {
  articleStore.fetchArticles();
});
</script>
