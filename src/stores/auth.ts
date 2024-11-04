import { defineStore } from 'pinia';
import axios from 'axios';
import { computed, ref } from 'vue';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
  type: "Writer" | "Editor";
  status: "Active" | "Inactive";
}

export const useAuthStore = defineStore('authStore', () => {
  /** States */
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref('');

  /** Computed */
  const isAuthenticated = computed(() => {
    return !!user.value || !!localStorage.getItem('user'); // Check if user data exists in localStorage
  });const createArticle = async (params: any) => {
    try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        // Set writer_id from the current user's ID, editor_id as null initially
        const newParams = {
            ...params,
            date: formattedDate,
            status: 'For Edit',
            writer_id: authStore.user?.id, // assuming `user` is an object with `id`
            editor_id: null, // no editor at creation time
        };

        const response = await axios.post(`${import.meta.env.VITE_SERVER_PORT}/articles`, newParams);
        articles.value.push(response.data);
    } catch (err) {
        console.error('Error adding article:', err);
    }
};

const updateArticle = async (articleId: string | number, params: any) => {
    try {
        // Set the editor_id to the current user's ID if they're editing the article
        const updatedParams = {
            ...params,
            editor_id: authStore.user?.id, // assuming the editor is logged in
        };

        const response = await axios.put(`${import.meta.env.VITE_SERVER_PORT}/articles/${articleId}`, updatedParams);
        const index = articles.value.findIndex(article => article.id === articleId);
        if (index !== -1) {
            articles.value[index] = response.data;
        }
    } catch (err) {
        console.error('Error updating article:', err);
    }
};

  const authUser = computed(() => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '') :  user.value;
  })

  const userType = computed(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser).type : null; // Return "Writer", "Editor", or null
  });

  /** Actions */

  // Load user data from localStorage if available
  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };

  // Login method
  const login = async (param: any) => {
    loading.value = true;
    error.value = '';
    try {
      // Fetch users from mock database
      const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/users`);
      const users = response.data as User[];

      // Find the user with matching username and password
      const foundUser = users.find(
        (u) => u.username === param.username && u.password === param.password && u.status === 'Active'
      );

      if (foundUser) {
        user.value = foundUser;

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user.value));

      } else {
        error.value = 'Invalid username or password, or user is inactive.';
      }
    } catch (err) {
      error.value = 'Login failed. Please try again.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Logout method
  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    authUser,
    userType,
    login,
    logout,
    loadUserFromStorage,
  };
});
