<script>
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import ScrollDownIcon from '$lib/icons/ScrollDownIcon.svelte';
	import LoginView from '$lib/views/LoginView.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import PostList from '$lib/components/PostList.svelte';

	import { onMount } from 'svelte';

	export let data;
	let { query } = data;

	let posts;
	onMount(() => {
		// query 기반으로 게시글 가져오기 posts에 게시글 배열 저장
	});
</script>

<section
	class="max-w-[1100px] relative w-full h-full flex flex-col items-center justify-center mt-[32px]"
>
	<PostList {posts} />
</section>
