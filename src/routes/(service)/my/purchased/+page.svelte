<script>
	import { api } from '$lib/api.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let posts = [
		{
			id: '123',
			title: '132123',
			introduce: '!231231'
		}
	];
	onMount(async () => {
		// posts 에 구매한 한 게시물 가져와서 보여주기
	});
</script>

{#each posts as post}
	<button
		on:click={() => goto('/post/' + post.id)}
		class="w-[912px] h-[108px] rounded-[16px] border border-[#C9C9C9] px-[10px] py-[16px] flex justify-between"
	>
		<div class="flex flex-col text-left w-[774px]">
			<p class="text-black text-[18px] w-[774px] font-medium break-all">{post.title}</p>
			<p class="text-black text-[12px] w-[774px] break-all">{post.introduce}</p>
		</div>
		<img class="ml-[16px]" alt="post_image" src={post.image} />
	</button>
{/each}
