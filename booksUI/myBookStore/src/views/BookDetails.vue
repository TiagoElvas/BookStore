<template>
  <div class="max-w-3xl mx-auto p-6">
    <div v-if="loading" class="text-center py-10">
      <p>Loading book details...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 p-6 rounded-lg text-red-700">
      <p>Error loading book: {{ error }}</p>
    </div>

    <div v-else-if="book" class="bg-white p-6 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-gray-900">{{ book.name }}</h1>
      <p class="text-gray-600 text-lg">by {{ book.author }}</p>
      <p class="mt-4 text-gray-700">{{ book.yearReleased }}</p>

      <!-- Display book cover if available, otherwise show a placeholder -->
      <img v-if="book.imageUrl" :src="book.imageUrl" alt="Book Cover" class="m-auto w-60 h-auto rounded-lg shadow" />
      <p v-else class="mt-4 w-40 rounded-lg shadow">No image found</p>

      <div class="mt-6">
        <h2 class="text-xl font-semibold">Description</h2>
        <p class="mt-2 text-gray-700">{{ book.description }}</p>

        <div class="mt-4 flex gap-4">
          <p v-if="book.pageCount"><span class="font-medium">Pages:</span> {{ book.pageCount }}</p>
          <p v-if="book.averageRating"><span class="font-medium">Rating:</span> {{ book.averageRating }}/5</p>
        </div>

        <div v-if="book.categories && book.categories.length" class="mt-2">
          <span class="font-medium">Categories:</span>
          <span v-for="(category, index) in book.categories" :key="index"
            class="ml-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {{ category }}
          </span>
        </div>

        <button class="mt-5 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" @click="markAsRead">
          ✅ Mark as Read
        </button>
      </div>
    </div>

      <div v-else class="bg-yellow-100 p-6 rounded-lg">
        <p>No book found with this ID.</p>
      </div>



    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBookById, getBookDetails } from '@/services/bookService';

const route = useRoute();
const book = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {

  try {
    loading.value = true;
    const bookData = await getBookById(route.params.id);
    const bookDetails = await getBookDetails(bookData.name, bookData.author);

    book.value = {
      ...bookData,
      imageUrl: bookDetails?.thumbnail || null,
      description: bookDetails?.description || 'No description available',
      publishedDate: bookDetails?.publishedDate || 'Unknown',
      pageCount: bookDetails?.pageCount,
      categories: bookDetails?.categories,
      averageRating: bookDetails?.averageRating

    }

  } catch (err) {
    error.value = err.message || 'Failed to load book details';
    console.error('Error loading book:', err);
  } finally {
    loading.value = false;
  }
});

const markAsRead = () => {
  // Implement your markAsRead functionality here
  console.log('Marked as read:', book.value.title);
}
</script>
