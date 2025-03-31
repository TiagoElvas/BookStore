<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4"> New York Times Bestsellers</h1>

    <div>
      <input
        type="text"
        v-model="searchBook"
        placeholder="🔍 Search books..."
        class="w-full p-2 mb-4 border rounded-lg"
      />
    </div>


    <div v-if="loading" class="text-center">Loading...</div>

    <div v-else-if="error" class="text-red-500">
      ❌ Failed to fetch bestsellers. Please try again later.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="book in filteredBooks"
        :key="book.primary_isbn13"
        class="bg-white p-4 rounded-lg shadow-md"
      >
        <img :src="book.book_image" :alt="book.title" class="w-full rounded-lg">
        <h2 class="text-xl font-semibold mt-2">{{ book.title }}</h2>
        <p class="text-gray-600">By {{ book.author }}</p>
        <p class="text-sm text-gray-500 mt-1">{{ book.description }}</p>
        <a
          :href="book.amazon_product_url"
          target="_blank"
          class="mt-3 inline-block text-blue-500 hover:underline"
        >
          📖 Buy on Amazon
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed} from 'vue';
import { getBestSellers } from '@/services/NyTBookAPI';

const books = ref([]);
const loading = ref(true);
const error = ref(false);
const searchBook = ref('');

onMounted(async () => {
  try {
    books.value = await getBestSellers();
  } catch (err) {
    error.value = true;
    throw err;
  } finally {
    loading.value = false;
  }
});

const filteredBooks = computed(() => {
  return books.value.filter( book => {
    return book.title.toLowerCase().includes(searchBook.value.toLowerCase()) ||
    book.author.toLowerCase().includes(searchBook.value.toLowerCase())
  });
})
</script>
