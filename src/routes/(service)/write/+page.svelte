<script>
	import { marked } from 'marked';

	import ImageIcon from '$lib/icons/ImageIcon.svelte';

	import { api } from '$lib/api.js';
	import { goto } from '$app/navigation';

	marked.use({
		breaks: true,
		gfm: true
	});

	let prompt = '';
	let doubled_enter = false;
	let background_image = '';
	let preview_toggle = false;

	let title = '';
	let content = [];
	let introduce = '';
	let price = '0';

	let background_image_file;
	async function select_background(e) {
		background_image_file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(background_image_file);
		reader.onload = (e) => {
			console.log(e.target.result);
			background_image = e.target.result;
		};
	}
	async function add_image(e) {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			content.push({
				type: 'image',
				src: e.target.result,
				file
			});
			content = content;
		};
	}

	async function upload() {
		console.log(background_image_file);
		console.log(content);
		console.log(introduce);
		if (!background_image_file || content.length == 0 || !introduce) {
			alert('글의 필수 요소들을 다 작성하여 주세요. ');
			return;
		}
		let background_image_filename;
		const background_image_upload_formData = new FormData();
		background_image_upload_formData.append('file', background_image_file);
		const background_image_file_upload_res = await api.post(
			'/upload',
			background_image_upload_formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)
		// "[{"type":"markdown","markdown":"dasdsa"},{"type":"image"}]"
		if (background_image_file_upload_res) {
			if (background_image_file_upload_res.data.error) {
				alert(background_image_file_upload_res.data.error);
				return;
			}
			background_image_filename = background_image_file_upload_res.data.content.image.id;
			console.log('백그라운드 이미지 업로드 완료');
		}
		for (const c of content) {
			if (c.type == 'image' && c.file) {
				const formData = new FormData();
				formData.append('file', c.file);
				let file_upload_res = await api.post('/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				if (file_upload_res) {
					if (file_upload_res.data.error) {
						alert(file_upload_res.data.error);
						return;
					}
					const fileName = file_upload_res.data.content.image.id;
					c.src = fileName;
					delete c.file;
					console.log('이미지 업로드 완료');
				}
			}
		}

		const res = await api.put('/post', {
			title,
			content: JSON.stringify(content),
			introduce,
			imageId: background_image_filename,
			isPaid: Number(price?.replace(/\D/g, '')) > 0,
			price: Number(price?.replace(/\D/g, ''))
		});

		if (res) {
			if (res.data.error) {
				alert(res.data.error);
				return;
			}
			goto('/').then(() => {
				goto('/my/purchased');
			});
		}
	}

	$: {
		if (price) {
			price = Number(price.replace(/\D/g, '')).toLocaleString('ko-kr');
		}
	}
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
			bind:value={title}
			class="text-[35px] font-bold placeholder:text-white text-white bg-transparent ring-0 outline-none"
			placeholder="제목"
		/>
		<label for="select_background" class="font-medium text-[20px] text-white">사진 추가하기</label>
		<input
			class="h-0 w-0"
			type="file"
			id="select_background"
			name="select_background"
			accept="image/*"
			on:change={select_background}
		/>
	</div>
</div>
<div class="w-[740px] flex flex-col items-center mb-[100px]">
	<div
		class="w-[725px] h-[171px] py-[20px] px-[27px] rounded-[13px] border border-[#C9C9C9] mt-[31px] shadow-md"
	>
		<p class="text-black text-[18px] font-bold">포스트 소개</p>
		<textarea
			bind:value={introduce}
			class="w-full h-[100px] text-[16px] resize-none outline-none ring-0 placeholder:text-[#C9C9C9]"
			placeholder="포스트 소개 작성"
		/>
	</div>
	<div class="w-full h-full mt-[25px] text-inherit">
		{#each content as c, index}
			{#if c.type == 'markdown'}
				{@html marked(c.markdown)}
			{:else if c.type == 'image'}
				<img class="w-full rounded-[20px] my-[16px]" alt="image_{index}" src={c.src} />
			{:else if c.type == 'linebreak'}
				<br />
			{/if}
		{/each}
	</div>
	<textarea
		bind:value={prompt}
		on:keydown={(e) => {
			if (!event.shiftKey && e.key == 'Enter') {
				event.preventDefault();
				if (prompt == '') {
					content.push({
						type: 'linebreak'
					});
					prompt = '';
					content = content;
					return;
				}
				content.push({
					type: 'markdown',
					markdown: prompt
				});
				content = content;
				prompt = '';
			}
		}}
		class=" w-full h-full text-[16px] placeholder:text-[#C9C9C9]
    resize-none outline-none ring-0"
		placeholder="작성하세요"
		on:input={(e) => {
			const textarea = e.srcElement;
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}}
	/>
</div>
<input
	class="h-0 w-0"
	type="file"
	id="add_image"
	name="add_image"
	accept="image/*"
	on:change={add_image}
/>

<div class="fixed left-1/2 -translate-x-1/2 bottom-[32px] w-[541px] flex justify-between">
	<label
		for="add_image"
		class="group w-[56px] h-[56px] aspect-square flex items-center justify-center bg-white border border-[#C9C9C9] shadow-lg rounded-full"
	>
		<ImageIcon />
	</label>
	<div
		class="w-[474px] h-[56px] rounded-[20px] bg-white border border-[#C9C9C9] shadow-lg flex items-center justify-between px-[20px]"
	>
		<input
			bind:value={price}
			class="text-[18px] outline-none ring-0 placeholder:text-[#A0A0A0] w-2/3"
			placeholder="가격"
		/>
		<button on:click={upload} class="p-[8px] bg-[#1A91FF] rounded-[11px] text-white"
			>{Number(price?.replace(/\D/g, '')) > 0 ? '유료로' : '무료로'} 공유하기
		</button>
	</div>
</div>

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
