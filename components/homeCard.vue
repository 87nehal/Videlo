<template>
  <div class="flex flex-col">
    <div class="hover:opacity-95 hover:scale-[1.02] transition-all duration-300 relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
      <img
        :src="thumbnail"
        :alt="title"
        class="w-full h-full object-cover"
      />
      <span class="absolute bottom-2 left-2 bg-gray-700 bg-opacity-75 text-white text-xs px-2 py-1 rounded-lg">
        {{ duration }}
      </span>
    </div>
    <h3 class="mt-2 text-sm font-semibold line-clamp-2">{{ title }}</h3>
    <div class="flex items-center mt-1">
      <img :src="channelImg" :alt="channel" class="w-6 h-6 rounded-full mr-2">
      <div>
        <p class="text-xs text-gray-500">{{ channel }}</p>
        <p class="text-xs text-gray-500">{{ views }} views · {{ published }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  thumbnail: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  channelImg: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  views: {
    type: String,
    required: true  
  },
  published: {
    type: String,
    required: true
  }
})
</script>