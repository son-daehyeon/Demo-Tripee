<script>
    import PaidIcon from '$lib/icons/PaidIcon.svelte';
	import { api } from '$lib/api';
		import { page } from "$app/stores";

	export let posts = [];

	const fetchPosts = async () => {
		const { data: response } = await api.get(`/post`);

		posts = response.content.posts;
	};

	if (!$page.url.pathname.includes('search')) {
		fetchPosts();
	}
</script>

<div class="w-full grid grid-cols-3 justify-items-center justify-between gap-y-[75px]">
	{#each posts as post}
		<div class="w-[296px]">
			<img class="w-[296px] h-[221px] bg-zinc-200 rounded-[15px] object-cover" src={`/api/uploads/${post.backgroundImage.fileName}`} alt={post.title} />
			<div class="flex items-center mt-[9px]">
				<p class="text-[22px]">
					{post.title}
				</p>
				{#if post.isPaid}
					<div
						class="w-[17px] h-[17px] ml-1 rounded-full bg-[#1A91FF] flex justify-center items-center"
					>
						<PaidIcon />
					</div>
				{/if}
			</div>
			<p class="text-[13px] text-[#747474]">{post.introduce}</p>
		</div>
	{/each}
</div>
