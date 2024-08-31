<script>
	import { marked } from 'marked';
	import LockIcon from '$lib/icons/LockIcon.svelte';
	import { api, user } from '$lib/api.js';
	import { onMount } from 'svelte';
	import { loadTossPayments } from "@tosspayments/tosspayments-sdk"

	export let data;
	const POST_ID = data.POST_ID;

	async function purhcase() {
		const tossPayments = await loadTossPayments("test_ck_Lex6BJGQOVDKEyjalPO3W4w2zNbg");

		const payment = tossPayments.payment({ customerKey: $user.id });

		const { orderId, paymentKey, amount } = await payment.requestPayment({
			method: "CARD",
			orderId: crypto.randomUUID(),
			orderName: title,
			amount: {
				currency: "KRW",
				value: price,
			},
			windowTarget: "iframe",
		});

		await api.post(`/post/${POST_ID}/buy`, { orderId, paymentKey, amount: amount.value });

		alert('구매 성공');
	}

	onMount(async () => {
		const { data: response } = await api.get(`/post/${POST_ID}`);
		const post = response.content.post;

		const raw_content = JSON.parse(post.content);
		if (raw_content !== null) {
			for (let i = 0; i < raw_content.length; i++) {
				if (raw_content[i].type === 'image') {
					const res = await api.get(`/upload/${raw_content[i].src}`);

					raw_content[i].src = res.data.content.image.fileName;
				}
			}
			content = raw_content;
		}
		console.log(raw_content);


		title = post.title;

		introduce = post.introduce;
		price = post.price;
		is_paid = post.paid;
		background_image = '/api/uploads/' + post.backgroundImage.fileName;
		author = post.owner.name;
		created_at = new Date(post.createdAt);

		if (post.owner.id === $user.id) {
			is_purchased = true;
		}

		const { data: response2 } = await api.get('/post/paid');

		response2.content.posts.forEach((post) => {
			if (post.id === POST_ID) {
				is_purchased = true;
			}
		});
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
	let created_at = new Date()
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
			{console.log(content)}
			{#each content as c, index}
				{#if c.type == 'markdown'}
					{@html marked(c.markdown)}
				{:else if c.type == 'image'}
					<img
						class="w-full rounded-[20px] my-[16px]"
						alt="image_{index}"
						src={'/api/uploads/' + c.src}
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
