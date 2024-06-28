<template>
  <div class="p-4">
    <HomeSlider
      src="https://picsum.photos/600/800"
      text="Play"
      buttonstyle="hidden"
    />
    <div class="flex flex-wrap justify-center items-center pt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      <!-- dummy data for 20 cards -->
      <HomeCard
        v-for="(card, index) in cards"
        :key="index"
        :thumbnail="card.thumbnail"
        :title="card.title"
        :duration="card.duration"
        :channelImg="card.channelImg"
        :channel="card.channel"
        :views="card.views"
        :published="card.published"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: Array(20).fill(0).map((_, index) => ({
        thumbnail: `https://picsum.photos/300/400?${index}`,
        title: `Video Title ${index}`,
        duration: `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60)}`,
        channelImg: `https://picsum.photos/300/300?${index}`,
        channel: `Channel Name ${index}`,
        views: `${Math.floor(Math.random() * 100000)}K`,
        published: `${Math.floor(Math.random() * 10)} weeks ago`,
      })),
    };
  },
};
</script>