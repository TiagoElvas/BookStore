<script setup>
import { ref, onMounted } from 'vue';
import { getBooks } from '@/services/bookService';

const books = ref([]);

onMounted(async () => {
  books.value = await getBooks();
});
</script>

<template>
  <div>
    <h2>📚 Book List</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }} - <router-link :to="`/book/${book.id}`">Details</router-link>
      </li>
    </ul>
  </div>
</template>
