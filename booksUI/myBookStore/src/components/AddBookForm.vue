<template>
  <div class="max-w-lg mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800">Add a New Book</h2>
    <form @submit.prevent="submitForm" class="mt-4 space-y-4">
      <input
        v-model="name"
        placeholder="Book Title"
        class="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-300"
        required
      />
      <input
        v-model="author"
        placeholder="Author Name"
        class="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-300"
        required
      />

      <button
        type="submit"
        class="w-full px-4 py-2 bg-gradient-to-l from-indigo-400 to-purple-500 text-white rounded hover:text-indigo-300 transition durantion-200"
      >
        Add Book
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { addBook } from '@/services/bookService';

const name = ref('');
const author = ref('');

const submitForm = async () => {
  try{
    await addBook({
      name: name.value,
      author: author.value,
    });

    name.value = '';
    author.value = '';
    alert('Book added!');
  } catch(error){
    console.log('Error adding the book.');
    throw error;
  }
};
</script>
