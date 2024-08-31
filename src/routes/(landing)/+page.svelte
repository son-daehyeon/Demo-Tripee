<script>
	import Logo from '$lib/Logo.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import ScrollDownIcon from '$lib/icons/ScrollDownIcon.svelte';
	import LoginView from '$lib/views/LoginView.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import { goto } from '$app/navigation';
	import { user,api } from '$lib/api.js'

	function search() {
		goto('/search?query=' + query);
	}
	let modal_toggle = false;

	let is_signup = false;

	let query;

	const fetch_user = async () => {
		const { data: response } = await api.get('/auth/me');

		if (response.content?.user) {
			user.set(response.content.user);
		}
	};

	fetch_user();
</script>

<div class="w-full bg-white">
	<header class=" fixed w-full flex justify-end z-10">
		<div class=" py-[20px] px-[38px]">
			{#if $user}
				<p>{$user.name}님</p>
			{:else}
				<button
					on:click={() => {
					modal_toggle = true;
					console.log(modal_toggle);
				}}
					class="bg-[#1A91FF] w-[73px] h-[30px] text-[16px] text-white rounded-[9px]"
				>
					시작하기
				</button>
			{/if}
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
							bind:value={query}
							on:keyup={(e) => {
								if (e.key === 'Enter') search();
							}}
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
			<p class="text-[33px] w-full text-center mb-[32px]">최신글 🌱</p>

			<PostList />
		</section>
	</main>
</div>
<Modal active={modal_toggle} toggle={() => (modal_toggle = false)}>
	<LoginView close={() => (modal_toggle = false)} />
</Modal>
