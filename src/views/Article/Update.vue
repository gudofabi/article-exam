<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold text-center mt-10 mb-5">
      Update Article: {{ getArticle?.title }}
    </h1>
    <ArticleForm :form-data="getArticle" :for-edit="true" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

import ArticleForm from "@/components/ArticleForm.vue";

import { useArticleStore } from "@/stores/articles";
const articleStore = useArticleStore();
const { getArticle } = storeToRefs(articleStore);

const route = useRoute();
const articleId = route.params.id;

let form = reactive({});

onMounted(async () => {
  await articleStore.findArticleById(articleId);
});
</script>
