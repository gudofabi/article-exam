<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold text-center mt-10 mb-5">Create Article</h1>
    <ArticleForm :form-data="form" :for-edit="false" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import ArticleForm from "@/components/ArticleForm.vue";

const form = reactive({
  title: "",
  link: "",
  image: null,
  content: "",
});
</script>
