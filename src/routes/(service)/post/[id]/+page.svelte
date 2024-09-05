<script>
  import Cookies from 'js-cookie';
  import { marked } from 'marked';
  import LockIcon from '$lib/icons/LockIcon.svelte';
  import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
  import Bookmark from '$lib/components/Bookmark.svelte';
  import Comment from '$lib/components/Comment.svelte';

  let title = '제주도 여행';
  let content = [
    {
      type: 'markdown',
      markdown:
        '## 1일차: 도착 및 서쪽 탐방\n- 오전: 제주공항 도착 후 렌터카 픽업. 가장 먼저 협재 해수욕장으로 이동해 제주의 맑고 푸른 바다를 감상하며 휴식을 취합니다.\n- 점심: 협재 근처에서 현지 음식을 즐겨보세요. 고기국수나 회국수를 추천합니다.\n- 오후: 한림공원으로 이동해 다양한 테마 정원과 야자수 숲을 구경합니다. 이어서 가까운 이호테우 해변의 말등대에서 일몰을 감상합니다.\n- 저녁: 제주시로 돌아와 제주산 돼지고기를 맛볼 수 있는 흑돼지 거리에서 저녁 식사.\n- 숙소: 제주시 숙소 체크인 후 휴식.\n',
    },
    {
      type: 'image',
      src: 'https://www.hotelscombined.co.kr/rimg/dimg/f6/b8/d3574e48-lm-73168-162074e2c42.jpg?width=1366&height=768&xhint=2848&yhint=1473&crop=true',
    },
    {
      type: 'markdown',
      markdown:
        '## 2일차: 서귀포 지역 탐방\n- 오전: 숙소에서 조식 후 천지연 폭포로 출발. 자연 속에서 시원한 폭포를 감상합니다.\n- 점심: 서귀포 시내에서 전복죽이나 갈치조림 등 해산물 요리를 즐깁니다.\n- 오후: 정방폭포와 서귀포 매일 올레시장을 방문해 제주 특산품을 구경하고 쇼핑합니다. 이어서 쇠소깍으로 이동해 카약을 타며 자연을 만끽합니다.\n- 저녁: 중문관광단지 근처에서 저녁 식사를 한 뒤, 중문색달해변에서 해변 산책.\n- 숙소: 서귀포 숙소에서 1박.',
    },
    {
      type: 'image',
      src: 'https://lh5.googleusercontent.com/proxy/8Sp_-DiYAWosIdF_7-vd5orqOK2yqG22dKivYku--pLQF0XhUuvRfQTfssWKs-gErMG71xKYdkkT1WSdZFut6S5TBeIfdGWCTqNzGwGGq-sAKi7J_8cf0f4jVgGid2TwegzZ5aCGnw',
    },
    {
      type: 'markdown',
      markdown:
        '## 3일차: 동쪽 및 중부 탐방\n- 오전: 이른 아침 성산 일출봉에서 일출을 감상합니다. 일출 후 근처에서 간단한 아침 식사.\n- 오전/오후: 우도로 이동해 우도의 멋진 해변과 경치를 즐깁니다. 자전거 또는 스쿠터를 렌트해 섬을 둘러보는 것도 추천합니다.\n- 점심: 우도에서 땅콩 아이스크림과 해산물 요리를 맛봅니다.\n- 오후: 제주 본섬으로 돌아와 섭지코지에서 산책 후 성읍 민속 마을을 방문해 제주 전통문화를 체험합니다.\n- 저녁: 제주시로 돌아와 마지막 저녁 식사를 즐깁니다. 제주 고기 국수나 해물탕을 추천합니다.\n- 숙소: 제주시 숙소에서 1박.',
    },
    {
      type: 'image',
      src: 'https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/g16y/image/xdmzslUfcSrBzJdsSKbrnNrGOM8.jpg',
    },
  ];
  let introduce = '이 일정은 제주도에서의 아름다운 3박 4일간의 여행을 소개합니다.';
  let price = '1000';
  let is_paid = true;
  let background_image =
    'https://www.vviptravel.com/wp-content/uploads/2019/06/jeju-island-tour.jpg';
  let author = '홍길동';
  let created_at = new Date(2024, 8, 1);
  let is_purchased = Cookies.get('is_purchased') === 'true';

  marked.use({
    breaks: true,
    gfm: true,
  });

  const purhcase = async () => {
    const tossPayments = await loadTossPayments('test_ck_Lex6BJGQOVDKEyjalPO3W4w2zNbg');
    const tossPaymentsPayment = tossPayments.payment({ customerKey: 'demo' });
    await tossPaymentsPayment.requestPayment({
      method: 'CARD',
      amount: {
        value: parseInt(price),
        currency: 'KRW',
      },
      orderId: Math.random().toString(36).substring(2, 9),
      orderName: title,
      customerEmail: 'demo@example.com',
    });

    is_purchased = true;
    Cookies.set('is_purchased', 'true');
  };
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
        created_at.getDate(),
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
        {#if c.type === 'markdown'}
          {@html marked(c.markdown)}
        {:else if c.type === 'image'}
          <img class="w-full rounded-[20px] my-[16px]" alt="image_{index}" src={c.src} />
        {:else if c.type === 'linebreak'}
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

<Comment />
<Bookmark />

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
