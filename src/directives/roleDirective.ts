// src/directives/roleDirective.ts
import { useAuthStore } from '@/stores/auth';

export default {
  mounted(el: HTMLElement, binding: any) {
    const authStore = useAuthStore();
    const requiredRoles = binding.value; // Can be a single role or an array of roles

    // Retrieve user type directly from localStorage
    const storedUser = localStorage.getItem('user');
    const userType = storedUser ? JSON.parse(storedUser).type : null;

    // Check if the user's role matches any of the required roles
    if (Array.isArray(requiredRoles)) {
      if (!requiredRoles.includes(userType)) {
        el.style.display = 'none';
      }
    } else {
      if (userType !== requiredRoles) {
        el.style.display = 'none';
      }
    }
  },
};
