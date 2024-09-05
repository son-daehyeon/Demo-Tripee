<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import PaidIcon from '$lib/icons/PaidIcon.svelte';

  export let posts = [
    {
      id: 1,
      title: '제주도 여행',
      introduce: '이 일정은 제주도에서의 아름다운 3박 4일간의 여행을 소개합니다.',
      paid: false,
      backgroundImage: {
        fileName: 'https://www.vviptravel.com/wp-content/uploads/2019/06/jeju-island-tour.jpg',
      },
    },
  ];

  if ($page.url.pathname.includes('search')) {
    posts = [];
  }
</script>

<div class="w-full grid grid-cols-3 justify-items-center justify-between gap-y-[75px]">
  {#each posts as post}
    <button
      on:click={() => {
        goto('/post/' + post.id);
      }}
      class="w-[296px]"
    >
      <img
        class="w-[296px] h-[221px] bg-zinc-200 rounded-[15px] object-cover"
        src={post.backgroundImage.fileName}
        alt={post.title}
      />
      <div class="flex items-center mt-[9px]">
        <a href="/post/{post.id}">
          <p class="text-[22px]">
            {post.title}
          </p>
        </a>
        {#if post.paid}
          <div
            class="w-[17px] h-[17px] ml-1 rounded-full bg-[#1A91FF] flex justify-center items-center"
          >
            <PaidIcon />
          </div>
        {/if}
      </div>
      <p class="text-[13px] text-[#747474]">{post.introduce}</p>
    </button>
  {/each}
</div>
