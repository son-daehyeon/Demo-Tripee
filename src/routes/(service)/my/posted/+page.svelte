<script>
	import { api } from '$lib/api.js';
	import { onMount } from 'svelte';

	let posts = [
		{
			id: '123',
			title: '132123',
			introduce: '!231231'
		}
	];
	onMount(async () => {
		// posts 에 작성 한 게시물 가져와서 보여주기
	});
</script>
