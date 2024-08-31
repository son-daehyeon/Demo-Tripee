<script>
	import { marked } from 'marked';
	import LockIcon from '$lib/icons/LockIcon.svelte';
	import { api } from '$lib/api.js';
	import { onMount } from 'svelte';

	export let data;
	const { POST_ID } = data.POST_ID;

	async function purhcase() {
		// 구매하는 로직
	}
	onMount(() => {
		// 가져오는 로직
	});
	marked.use({
		breaks: true,
		gfm: true
	});

	let is_purchased = false;

	let title = '';
	let content = []; //JSON.parse(content)
	let introduce = '';
	let price = '0';
	let is_paid = true;
	let background_image = '';
	let author = '박건민';
	let created_at = new Date();
</script>

<div
	class=" relative w-full h-[167px] bg-[#D9D9D9] flex flex-col items-center bg-cover bg-center"
	style={background_image
		? 'background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("' +
			background_image +
			'");'
		: ''}
>
	<div class=" absolute w-[850px] top-1/2 -translate-y-1/2 flex flex-col">
		<input
			disabled
			bind:value={title}
			class="text-[35px] font-bold placeholder:text-white text-white bg-transparent ring-0 outline-none"
			placeholder="제목"
		/>

		<p class=" text-[18px] text-white">
			{author} | {created_at.getFullYear()}. {String(created_at.getMonth() + 1).padStart(2, '0')}. {String(
				created_at.getDate()
			).padStart(2, '0')}
		</p>
	</div>
</div>
<div class="w-[740px] flex flex-col items-center mb-[100px]">
	<div
		class="w-[725px] h-[171px] py-[20px] px-[27px] rounded-[13px] border border-[#C9C9C9] mt-[31px] shadow-md"
	>
		<p class="text-black text-[18px] font-bold">포스트 소개</p>
		<textarea
			readonly
			bind:value={introduce}
			class="w-full h-[100px] text-[16px] resize-none outline-none ring-0 placeholder:text-[#C9C9C9]"
			placeholder="포스트 소개 작성"
		/>
	</div>
	{#if (is_paid && is_purchased) || !is_paid}
		<div class="w-full h-full mt-[25px] text-inherit">
			{#each content as c, index}
				{#if c.type == 'markdown'}
					{@html marked(c.markdown)}
				{:else if c.type == 'image'}
					<img
						class="w-full rounded-[20px] my-[16px]"
						alt="image_{index}"
						src={'/api/upload/' + c.src}
					/>
				{:else if c.type == 'linebreak'}
					<br />
				{/if}
			{/each}
		</div>
	{:else}
		<div class="w-full h-full mt-[51px] flex flex-col items-center">
			<LockIcon />
			<p class="font-bold text-black text-[18px] mt-[20px]">
				결제 이후 열람이 가능한 컨텐츠입니다.
			</p>
		</div>
	{/if}
</div>
{#if is_paid && !is_purchased}
	<div class="fixed left-1/2 -translate-x-1/2 bottom-[32px] flex justify-between">
		<div
			class="w-[474px] h-[56px] rounded-[20px] bg-white border border-[#C9C9C9] shadow-lg flex items-center justify-between px-[20px]"
		>
			<input
				disabled
				value={Number(price).toLocaleString('ko-kr') + '원'}
				class="text-[18px] outline-none ring-0 placeholder:text-[#A0A0A0] w-2/3"
				placeholder="가격"
			/>
			<button on:click={purhcase} class="p-[8px] bg-[#1A91FF] rounded-[11px] text-white">
				결제하기
			</button>
		</div>
	</div>
{/if}

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox  */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
