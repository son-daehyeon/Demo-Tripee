<script>
	import Logo from '$lib/Logo.svelte';
	import SearchIcon from '$lib/SearchIcon.svelte';
	import ScrollDownIcon from '$lib/ScrollDownIcon.svelte';
	import PaidIcon from '$lib/PaidIcon.svelte';
	import LoginView from '$lib/views/LoginView.svelte';
	import Modal from '$lib/Modal.svelte';


	let modal_toggle = false;

	let is_signup = false;

	let dummy = [
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

<div class="w-full bg-white">
	<header class=" fixed w-full flex justify-end z-10">
		<div class=" py-[20px] px-[38px]">
			<button
				on:click={() => {
					modal_toggle = true;
					console.log(modal_toggle);
				}}
				class="bg-[#1A91FF] w-[73px] h-[30px] text-[16px] text-white rounded-[9px]"
			>
				시작하기
			</button>
		</div>
	</header>
	<main class="  w-full min-h-screen h-full flex flex-col items-center">
		<section class="relative w-full min-h-screen h-full flex flex-col items-center justify-center">
			<div class="flex flex-col items-center">
				<div class="w-[192px] h-[81px]">
					<Logo />
				</div>
				<div class="sticky top-[4px] w-[525px] h-[44px] mt-[11px] items-center justify-between">
					<div class="relative w-[525px] h-[44px]">
						<input
							class=" absolute pl-[20px] text-[18px] border-[#C9C9C9] flex w-[525px] h-[44px] rounded-[20px] border"
						/>
						<button class=" absolute right-[21px] top-1/2 -translate-y-1/2">
							<SearchIcon />
						</button>
					</div>
				</div>
				<p class="text-[18px] text-black mt-[21px]">
					<span class="text-[18px] text-[#1A91FF]">트리피</span>에서 새로운 여행 친구를
					만들어보세요!
				</p>
				<div class="absolute left-1/2 -translate-x-1/2 bottom-6 animate-bounce w-fit">
					<ScrollDownIcon />
				</div>
			</div>
		</section>
		<section class="w-full max-w-[1100px] mt-16">
			<p class="text-[33px] w-full text-center mb-[32px]">트리피에서만의 따끈한 최신글 🌱</p>

			<div class="w-full grid grid-cols-3 justify-items-center justify-between gap-y-[75px]">
				{#each dummy as article}
					<div class="w-[296px]">
						<div class="w-[296px] h-[221px] bg-zinc-200 rounded-[15px]"></div>
						<div class="flex items-center mt-[9px]">
							<p class="text-[22px]">
								{article.title}
							</p>
							{#if article.isPaid}
								<div
									class="w-[17px] h-[17px] ml-1 rounded-full bg-[#1A91FF] flex justify-center items-center"
								>
									<PaidIcon />
								</div>
							{/if}
						</div>
						<p class="text-[13px] text-[#747474]">{article.content}</p>
					</div>
				{/each}
			</div>
		</section>
	</main>
</div>
<Modal active={modal_toggle} toggle={() => (modal_toggle = false)}>
	<LoginView />
</Modal>
