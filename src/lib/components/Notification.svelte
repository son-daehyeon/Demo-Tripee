<script>
	import NotificationIcon from '$lib/icons/NotificationIcon.svelte';

	let toggle = false;
	let notifications = [
		{
			title: 'tesae',
			content: 'asdasdasdasdascontent',
			image: ''
		}
	];

	async function fetch_notificaitons() {
		// 노티 가져오기
	}

	async function view_notification(id) {
		// 노티 터치 시
	}
</script>

{#if toggle}
	<div
		class=" fixed w-[200px] h-[410px] bg-white z-10 bottom-[30px] left-[30px] rounded-[20px] border border-[#C9C9C9]"
	>
		<div class="flex flex-col items-center p-[14px] space-y-[12px]">
			{#each notifications as noti}
				<button on:click={() => view_notification(noti.id)} class="w-full flex items-center">
					<img class="w-[35px] h-[35px]" alt="noti_image" src={noti.image} />
					<div class="flex flex-col">
						<p class="text-[12px] text-black my-[3px]">
							{noti.title}
						</p>
						<p class="text-[10px] text-[#808080] mb-[3px]">
							{noti.content}
						</p>
					</div>
				</button>
			{/each}
		</div>
		<button on:click={() => (toggle = !toggle)} class=" absolute left-[12px] bottom-[12px]">
			<NotificationIcon />
		</button>
	</div>
{:else}
	<button
		on:click={() => (toggle = !toggle)}
		class="fixed left-[30px] bottom-[30px] rounded-full border bg-white w-[50px] h-[50px]"
	>
		<div class=" relative w-full h-full flex items-center justify-center">
			<p
				class=" absolute border border-[#C9C9C9] -top-[1px] right-[4px] translate-x-1/2 px-[4px] bg-[#FF6565] text-white rounded-full text-[10px] text-center"
			>
				{notifications.length}
			</p>
			<NotificationIcon />
		</div>
	</button>
{/if}
