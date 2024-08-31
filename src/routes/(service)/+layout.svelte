<script>
	import Logo from '$lib/Logo.svelte';
	import { goto } from '$app/navigation';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import '../../app.css';
	import { api, user } from '$lib/api.js';

	export let data;
	let { query } = data;

	function search() {
		goto('/').then(() => {
			goto('/search?query='+query);
		})
	}

	const fetch_user = async () => {
		const { data: response } = await api.get('/auth/me');

		if (response.content?.user) {
			user.set(response.content.user);
		}
	};

	fetch_user();
</script>

<div class="w-full bg-white flex flex-col ">
	<header class="w-full flex justify-center items-center z-10 h-[71px] border-b border-[#C9C9C9]">
		<div class="max-w-[1100px] w-full flex justify-between items-center">
			<div class="flex h-full w-[650px] justify-between">
				<button class="w-[96px] h-[41px]" on:click={() => goto('/')}>
					<Logo />
				</button>
				<div class="relative w-[525px] h-[44px]">
					<input
						bind:value={query}
						on:keyup={(e) => {
							if (e.key == 'Enter') search();
						}}
						class=" absolute pl-[20px] text-[18px] border-[#C9C9C9] flex w-[525px] h-[44px] rounded-[20px] border"
					/>
					<button class=" absolute right-[21px] top-1/2 -translate-y-1/2">
						<SearchIcon />
					</button>
				</div>
			</div>
			<div class=" py-[20px] px-[38px]">
				<button
					on:click={() => {
						modal_toggle = true;
					}}
					class="bg-[#1A91FF] w-[73px] h-[30px] text-[16px] text-white rounded-[9px]"
				>
					시작하기
				</button>
			</div>
		</div>
	</header>

	<main class=" w-full min-h-screen h-full flex flex-col items-center">
		<slot />
	</main>
</div>
<Notification />
