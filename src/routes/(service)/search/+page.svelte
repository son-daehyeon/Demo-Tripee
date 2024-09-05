<script>
  import PostList from '$lib/components/PostList.svelte';
  import { onMount } from 'svelte';

  export let data;
  let { query } = data;

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

  onMount(async () => {
    posts = posts.filter((post) => post.title.includes(query));
  });
</script>

<section
  class="max-w-[1100px] relative w-full h-full flex flex-col items-center justify-center mt-[32px]"
>
  <PostList {posts} />
</section>
