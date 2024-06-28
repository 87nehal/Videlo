<template>
  <NuxtLayout>
    <NuxtPage  class="bg-gray-100"/>
  </NuxtLayout>
</template>
<style>
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
