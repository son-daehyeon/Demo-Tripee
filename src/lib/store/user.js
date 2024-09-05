import { writable } from 'svelte/store';

export const user = writable({
  id: 1,
  userId: 'demo_user',
  password: 'demo_password',
  name: 'Demo',
  paidPosts: [],
  savedPosts: [],
  avatar: null,
  createdAt: new Date(2024, 8, 1).toISOString(),
  updatedAt: new Date(2024, 8, 1).toISOString(),
});
