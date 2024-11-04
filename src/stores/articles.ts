import { defineStore } from 'pinia';
import axios from 'axios';
import { computed, reactive, ref } from 'vue';

export interface Person {
    id: number;
    firstname: string;
    lastname: string;
}

export interface Company {
    id: number;
    name: string;
}

export interface Article {
    id: number;
    image: string;
    title: string;
    link: string;
    date: string; // Use 'string' for dates if not using a Date object
    content: string;
    status: "For Edit" | "Published"; // Limit status to specific strings
    writer: Person;
    editor: Person | null; // Editor can be null
    company: Company;
}

export const useArticleStore = defineStore('articleStore', () => {

    /** States */
    const articles = ref([]) as unknown as Article[] ;
    const article = ref('') as unknown as Article;
    const loading = ref(false)
    const error = ref('')
    
    /** Computed */

    const getArticles = computed(() => {
        return articles.value ?? []
    })

    const getArticle = computed(() => {
        return article.value ?? null
    })

    /** Actions */
    const fetchArticles =  async () => {
        loading.value = true;
        error.value = '';
        try {
            const response = await axios.get('http://localhost:3000/articles');
            articles.value = response.data;
        } catch (err) {
            error.value = 'Failed to fetch articles';
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    const createArticle = async (params: any) => {
        try {
             // Get the current date and format it as YYYY-MM-DD
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0]; // Extracts the date part only

            // Add the formatted date to params
            const newParams = { ...params, date: formattedDate, status: 'For Edit' };
            const response = await axios.post('http://localhost:3000/articles', newParams);
            console.log(response)
            articles.value.push(response.data);
          } catch (err) {
            console.error('Error adding article:', err);
          }
    }

    const updateArticle = async (articleId: string | number, params: any) => {
        try {
            const response = await axios.put(`http://localhost:3000/articles/${articleId}`, params);
            const index = articles.value.findIndex(article => article.id === articleId);
            if (index !== -1) {
              articles.value[index] = response.data;
            }
          } catch (err) {
            console.error('Error updating article:', err);
          }
    }

    const deleteArticle = async (id: string|number) => {
        try {
            await axios.delete(`http://localhost:3000/articles/${id}`);
            articles.value = articles.value.filter(article => article.id !== id);
          } catch (err) {
            console.error('Error deleting article:', err);
          }
    }

    // Method to fetch a single article by ID
    const findArticleById = async (id: any) => {
        try {
            const response = await axios.get(`http://localhost:3000/articles/${id}`);
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
        findArticleById
    }
})