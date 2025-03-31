<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">📚 My Book Collection</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="book in books"
        :key="book.id"
        class="bg-white p-4 text-center rounded-lg shadow-lg hover:shadow-2xl transition"
      >
        <h2 class="text-lg font-semibold">{{ book.name }}</h2>
        <p class="text-gray-500">By {{ book.author }}</p>
        <div class="flex space-x-20 pt-5">
          <router-link
          :to="`/book/${book.id}`"
          class="text-blue-600 hover:underline"
          >View Details</router-link>
          <button class="text-red-400 hover:underline" @click="removeBook(book)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { deleteBook, getBooks } from '@/services/bookService';

const books = ref([]);

const removeBook = async (book) => {
   if (!book || !book.id) {
    console.error('Cannot remove book: Invalid book or missing ID', book);
    return; // Exit early if no valid ID
  }
  try{
    await deleteBook(book.id);

    books.value = books.value.filter(b => b.id !== book.id);

  } catch(error){
    console.log('Error removing book: ', error);
    throw error;
  }
}

onMounted(async () => {
  books.value = await getBooks();
});
</script>
