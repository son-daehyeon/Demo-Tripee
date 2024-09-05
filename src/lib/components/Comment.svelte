<script>
  import CommentIcon from '$lib/icons/CommentIcon.svelte';

  let toggle = false;
  let comments = [
    {
      owner: {
        avatar: {
          fileName: null,
        },
        name: '홍길동',
      },
      createdAt: '2024-09-01T12:00:00',
      content: '안녕하세요',
    },
  ];
  let comment_input = '';

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
  };
</script>

{#if toggle}
  <div
    class=" fixed w-[200px] h-[410px] bg-white z-10 bottom-[30px] right-[30px] rounded-[20px] border border-[#C9C9C9]"
  >
    <div class="fixed w-[200px] h-[360px] overflow-scroll">
      {#each comments as comment}
        <div class=" p-4 border-b border-[#C9C9C9]">
          <div class=" flex items-center">
            <img alt="profile_image" src="/profile.png" class=" w-[20px] h-[20px] rounded-full" />
            <p class=" ml-1 text-[13px]">{comment.owner.name}</p>
          </div>
          <p class="text-[7px] text-[#787878]">{formatDate(new Date(comment.createdAt))}</p>
          <p class=" mt-[2px] text-[10px]">{comment.content}</p>
        </div>
      {/each}
    </div>
    <input
      bind:value={comment_input}
      on:keydown={async (e) => {
        if (e.key === 'Enter') {
          comments = [
            ...comments,
            {
              owner: {
                avatar: {
                  fileName: null,
                },
                name: 'Demo User',
              },
              createdAt: new Date().toISOString(),
              content: comment_input,
            },
          ];

          comment_input = '';
        }
      }}
      class="absolute bottom-[10px] ml-[11px] w-[141px] h-[27px] rounded-[10px] border border-[#C9C9C9] text-[12px] text-black"
    />
    <button on:click={() => (toggle = !toggle)} class=" absolute right-[12px] bottom-[12px]">
      <CommentIcon />
    </button>
  </div>
{:else}
  <button
    on:click={() => (toggle = !toggle)}
    class="fixed right-[30px] bottom-[30px] rounded-full border bg-white w-[50px] h-[50px]"
  >
    <div class=" relative w-full h-full flex items-center justify-center">
      <CommentIcon />
    </div>
  </button>
{/if}
