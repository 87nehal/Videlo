<template>
    <div class="flex flex-col h-screen">
      <Navbar class="z-10 fixed" />
      <div class="flex flex-1 overflow-hidden">
        <Sidebar class="z-5" />
        <main class="flex-1 overflow-auto">
          <slot />
        </main>
      </div>
    </div>
</template>