<template>
  <nav class="bg-white shadow-sm sticky top-0">
    <div class="mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img class="h-8 w-auto" src="" alt="Your Logo">
        </div>
       
        <!-- Search bar -->
        <div class="flex-1 max-w-xl mx-4">
          <div class="relative">
            <input type="text" placeholder="Search"
                   class="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon name="mdi:magnify" class="text-gray-400 h-6 w-6" />
            </button>
          </div>
        </div>
       
        <!-- User menu -->
        <div class="flex items-center space-x-2">
          <button class="p-2 w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Icon name="mdi:plus" class="h-6 w-6" />
          </button>
          <button class="p-2 w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Icon name="mdi:bell-outline" class="h-6 w-6" />
          </button>
          <button class="p-2 w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Icon name="mdi:account-outline" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
   
    <!-- Category buttons -->
    <div class="overflow-x-auto whitespace-nowrap px-4 py-2 border-t flex justify-between custom-scrollbar">
      <button v-for="category in categories" :key="category"
              class="px-3 py-1 mr-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
        {{ category }}
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      categories: [
        'All', 'Art', 'Entertainment', 'Games', 'History', 'How to', 'Internet',
        'Music', 'Nature', 'Sports', 'Technology', 'Travel', 'Animals', 'Celebrity',
        'Books', 'Fashion', 'Kids', 'Space'
      ]
    }
  }
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #F7FAFC;
}
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #F7FAFC;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 20px;
  border: 3px solid #F7FAFC;
}
</style>