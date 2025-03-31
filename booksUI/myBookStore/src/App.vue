<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <nav class="px-6 py-4 bg-gradient-to-r from-indigo-400 to-purple-500 shadow-md">
      <div class="max-w-6xl mx-auto flex justify-center items-center">
        <div class="flex items-center">
          <span class="text-white font-bold text-xl mr-8">BookApp</span>
          <div class="flex gap-6">
            <router-link to="/" class="text-white hover:text-indigo-300 transition duration-200 flex items-center gap-2">
              <span class="text-lg"></span> Home
            </router-link>
            <router-link to="/library" class="text-white hover:text-indigo-300 transition duration-200 flex items-center gap-2">
              <span class="text-lg"></span> BestSellers From NYTimes
            </router-link>
            <router-link to="/bestsellers-history" class="text-white hover:text-indigo-300 transition duration-200 flex items-center gap-2">
              <span class="text-lg"></span> Bestsellers History NYTimes
            </router-link>
            <router-link to="/add" class="text-white hover:text-indigo-300 transition duration-200 flex items-center gap-2">
              <span class="text-lg"></span> Add Book
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- This renders the current page -->
    <div class="p-6 max-w-7xl mx-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// Any future component logic can go here
</script>

<style>
.router-link-active {
  @apply font-medium border-b-2 border-white;
}
</style>