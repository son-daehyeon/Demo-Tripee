<script>
    import PaidIcon from '$lib/icons/PaidIcon.svelte';

	export let posts = [
		{ title: '글 제목', content: '글내용' },
		{ title: '글 제목', content: '글내용' },
		{ title: '제주도에서 귤 농사 체험하기', content: '글내용' },
		{ title: '글 제목', content: '글내용', isPaid: true },
		{ title: '글 제목', content: '글내용' },
		{ title: '글 제목', content: '글내용', isPaid: true },
		{ title: '글 제목', content: '글내용', isPaid: true },
		{ title: '글 제목', content: '글내용' },
		{ title: '글 제목', content: '글내용' }
	];
</script>

<div class="w-full grid grid-cols-3 justify-items-center justify-between gap-y-[75px]">
	{#each posts as post}
		<div class="w-[296px]">
			<div class="w-[296px] h-[221px] bg-zinc-200 rounded-[15px]"></div>
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
			<p class="text-[13px] text-[#747474]">{post.content}</p>
		</div>
	{/each}
</div>
