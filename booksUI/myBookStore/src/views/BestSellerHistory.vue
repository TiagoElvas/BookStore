<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">📖 Best Sellers History</h1>

    <!-- Search Bar -->
    <input
      v-model="searchQuery"
      @keyup.enter="fetchHistory"
      placeholder="🔍 Enter book title..."
      class="w-full p-2 mb-4 border rounded-lg"
    />
    <button
      @click="fetchHistory"
      class="bg-gradient-to-l from-indigo-400 to-purple-500 hover:text-indigo-300 transition durantion-200 text-white px-4 py-2 rounded-lg"
    >
      Search
    </button>

    <div v-if="loading" class="text-center mt-4">Loading...</div>

    <div v-else-if="error" class="text-red-500 mt-4">
      ❌ Failed to fetch data.
    </div>

    <div v-else-if="history.length === 0 && searchQuery" class="mt-4">
      No results found.
    </div>

    <div v-else class="mt-6">
      <div
        v-for="book in history"
        :key="book.title"
        class="bg-white p-4 rounded-lg shadow-md mb-4"
      >
        <h2 class="text-xl font-semibold">{{ book.title }}</h2>
        <p class="text-gray-600">By {{ book.author }}</p>
        <p class="text-sm text-gray-500 mt-1">{{ book.description }}</p>
        <p v-if="book.ranks_history.length > 0" class="text-blue-500 mt-2">
          Appeared on NYT Best Sellers list {{ book.ranks_history.length }} times!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getBestSellersHistory } from '@/services/NyTBookAPI';

const searchQuery = ref("");
const history = ref([]);
const loading = ref(false);
const error = ref(false);

async function fetchHistory() {
  if (!searchQuery.value) return;

  loading.value = true;
  error.value = false;

  try {
    history.value = await getBestSellersHistory(searchQuery.value);
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
}
</script>
