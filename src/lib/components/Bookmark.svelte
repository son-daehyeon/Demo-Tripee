<script>
  import BookmarkIcon from '$lib/icons/BookmarkIcon.svelte';

  let bookmarked = false;

  const onBookmarkClick = async () => {
    bookmarked = !bookmarked;
  };
</script>

<button
  on:click={onBookmarkClick}
  class={`fixed right-[100px] bottom-[30px] rounded-full border w-[50px] h-[50px] ${bookmarked ? 'bg-yellow-300' : 'bg-white'}`}
>
  <div class="relative w-full h-full flex items-center justify-center">
    <BookmarkIcon />
  </div>
</button>
