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
  });

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
