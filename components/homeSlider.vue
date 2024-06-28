<template>
    <div class="w-full h-44 sm:h-44 md:h-64 lg:h-96  rounded-lg overflow-hidden shadow-md block">
        <img class="w-full h-full object-cover " :src="src" alt="">
        <button @click="buttonaction" class="z-10 relative bottom-16 left-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow" :class="buttonstyle">
            {{ text }}
        </button>
    </div>
</template>
<script setup>
    const props = defineProps({
        src: {
        type: String,
        required: true
        },
        text:{
            type: String,
            required: true
        },
        buttonstyle:{
            type: String,
            required: true
        },
        buttonaction:{
            type: String,
        }
    })
</script>