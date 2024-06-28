<template>
  <div class="relative inline-block mb-2">
    <div
      class="bg-white hover:bg-gray-100 p-3 rounded-full w-12 h-12 flex justify-center items-center border border-gray-200 shadow-sm transition-all duration-300 ease-in-out"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <Icon :name="icon" class="h-6 w-6 text-gray-600" />
    </div>
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showTooltip"
        class="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-white text-black text-sm rounded-md px-3 py-1 shadow-lg z-10"
      >
        {{ title }}
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})  
const showTooltip = ref(false)
</script>