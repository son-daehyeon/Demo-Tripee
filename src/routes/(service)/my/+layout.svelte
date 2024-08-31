<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import SettingIcon from '$lib/icons/SettingIcon.svelte';
	import { user } from '$lib/api';

	console.log($user);

	let current = $page.url.pathname;
	$: {
		current = $page.url.pathname;
	}
</script>

<div class="flex w-full h-full">
	<div class="w-[217px] min-h-screen h-full flex flex-col items-center border-r border-[#C9C9C9]">
		<div class="w-[179px] flex items-center justify-between my-[14px]">
			<div class="flex space-x-[5px] items-center">
				<img class="w-[36px] h-[36px] rounded-full" alt="profile" src={$user?.avatar ? `/api/uploads/${$user?.avatar?.fileName}` : '/profile.png'} />
				<p class="text-black text-[24px]">{$user?.name}</p>
			</div>
			<SettingIcon />
		</div>
		<div
			class="flex flex-col w-full text-[18px] text-black *:w-[206px] *:h-[38px] *:text-left items-center *:px-[14px] *:rounded-[10px] space-y-[1px]"
		>
			<button
				on:click={() => goto('/my/posted')}
				class={current == '/my/posted' ? 'bg-[#EDEDED]' : 'hover:bg-[#EDEDED]'}>작성글</button
			>
			<button
				on:click={() => goto('/my/purchased')}
				class={current == '/my/purchased' ? 'bg-[#EDEDED]' : 'hover:bg-[#EDEDED]'}>구매 목록</button
			>
			<button
				on:click={() => goto('/my/bookmarked')}
				class={current == '/my/bookmarked' ? 'bg-[#EDEDED]' : 'hover:bg-[#EDEDED]'}
				>저장 목록</button
			>
		</div>
	</div>
	<div class="w-full h-full flex flex-col items-center py-[45px]"><slot /></div>
</div>
