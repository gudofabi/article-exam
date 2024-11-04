import { defineStore } from 'pinia';
import axios from 'axios';
import { computed, ref } from 'vue';
import type { Article } from '@/types/interfaces';

export const useArticleStore = defineStore('articleStore', () => {
    /** States */
    const articles = ref<Article[]>([]); // Correctly typed as a ref holding an Article array
    const article = ref<Article | null>(null); // Single article, nullable initially
    const loading = ref(false);
    const error = ref('');

    /** Computed */
    const getArticles = computed(() => articles.value); // Access articles.value directly
    const getArticle = computed(() => article.value);

    /** Actions */
    const fetchArticles = async () => {
        loading.value = true;
        error.value = '';
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/articles`);
            articles.value = response.data;
        } catch (err) {
            error.value = 'Failed to fetch articles';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const createArticle = async (params: any) => {
        try {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];

            const newParams = { ...params, date: formattedDate, status: 'For Edit' };
            const response = await axios.post(`${import.meta.env.VITE_SERVER_PORT}/articles`, newParams);
            articles.value.push(response.data);
        } catch (err) {
            console.error('Error adding article:', err);
        }
    };

    const updateArticle = async (articleId: string | number, params: any) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER_PORT}/articles/${articleId}`, params);
            const index = articles.value.findIndex(article => article.id === articleId);
            if (index !== -1) {
                articles.value[index] = response.data;
            }
        } catch (err) {
            console.error('Error updating article:', err);
        }
    };

    const deleteArticle = async (id: string | number) => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_PORT}/articles/${id}`);
            articles.value = articles.value.filter(article => article.id !== id);
        } catch (err) {
            console.error('Error deleting article:', err);
        }
    };

    const findArticleById = async (id: any) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/articles/${id}`);
            article.value = response.data;
        } catch (err) {
            console.error('Error fetching article by ID:', err);
            return null;
        }
    };

    return {
        getArticles,
        getArticle,
        fetchArticles,
        createArticle,
        updateArticle,
        deleteArticle,
        findArticleById,
    };
});
