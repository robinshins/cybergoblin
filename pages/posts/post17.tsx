import React from 'react';
import Head from 'next/head';
import styles from './Post.module.css';
import PostNavigation from '@/components/PostNavigation/PostNavigation';
import Link from 'next/link';

const Post17 = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>AI 회사, 샌프란시스코에서 “인간 고용 중단” 광고 캠페인</title>
        <meta name="description" content="AI 회사 Artisan이 샌프란시스코에서 인간 고용 중단을 촉구하는 광고 캠페인을 벌이고 있습니다." />
        <meta property="og:title" content="AI 회사, 샌프란시스코에서 “인간 고용 중단” 광고 캠페인" />
        <meta property="og:description" content="AI 회사 Artisan이 샌프란시스코에서 인간 고용 중단을 촉구하는 광고 캠페인을 벌이고 있습니다." />
        <meta property="og:type" content="article" />
      </Head>
      <div className={styles.container}>
        <Link href="/" className={styles.homeButton}>
          홈으로 🏠
        </Link>
        <h1 className={styles.title}>AI 회사, 샌프란시스코에서 “인간 고용 중단” 광고 캠페인</h1>

        <p className={styles.paragraph}>
          최근 몇 년간 생성적 AI 시대가 도래하면서, 기술의 발전은 인간의 지적 노동을 대체할 수 있는 가능성에 대한 우려를 불러일으켰습니다. 이러한 상황에서 Y-Combinator의 지원을 받는 AI 회사 Artisan은 샌프란시스코에서 "Stop Hiring Humans"라는 자극적인 광고 캠페인을 시작했습니다. 이 광고는 인간 노동자의 역할을 대체할 AI 직원의 필요성을 강조하며, "Artisans"라는 이름으로 불리는 AI 소프트웨어 제품을 홍보하고 있습니다.
        </p>

        <h2 className={styles.heading2}>Artisan의 광고 캠페인</h2>
        <p className={styles.paragraph}>
          Artisan의 광고는 "Artisans won't complain about work-life balance"와 같은 메시지를 담고 있어, 인간 노동자들이 느끼는 불안과 스트레스를 조롱하는 듯한 인상을 줍니다. 이러한 광고는 샌프란시스코의 인구 밀집 지역에 걸쳐 배치되어 있으며, 많은 사람들에게 불안감을 조성하고 있습니다. 특히, 팬데믹 이후 경제적 불안정성이 커진 상황에서 이러한 광고는 더욱 부정적인 반응을 이끌어내고 있습니다.
        </p>

        <h2 className={styles.heading2}>AI의 역할과 Artisan의 비즈니스 모델</h2>
        <p className={styles.paragraph}>
          Artisan은 고객 서비스 및 판매 워크플로우 소프트웨어를 제공하는 회사로, AI "판매 에이전트"인 Ava를 통해 잠재 고객을 찾고 메시지를 자동으로 전송하는 기능을 제공합니다. 회사는 이 AI가 "인간의 개입 없이" 작동하며, 같은 역할을 수행하는 인간보다 96% 저렴하다고 주장하고 있습니다. 그러나 현재 AI 기술의 발전 상황을 고려할 때, 이러한 주장은 신중하게 받아들여져야 합니다.
        </p>

        <h2 className={styles.heading2}>사회적 반응과 비판</h2>
        <p className={styles.paragraph}>
          Artisan의 광고에 대한 반응은 대체로 부정적입니다. 소셜 미디어에서는 "이제는 완전한 사이버펑크 디스토피아에 가까워졌다"는 등의 비판이 이어지고 있습니다. 이러한 반응은 샌프란시스코의 경제적 불평등과 사회적 긴장감을 반영하고 있습니다. Artisan의 CEO인 Jaspar Carmichael-Jack은 이러한 광고가 다소 디스토피아적일 수 있지만, AI의 발전이 가져오는 변화에 대한 경각심을 일깨우기 위한 것이라고 주장했습니다.
        </p>

        <h2 className={styles.heading2}>미래의 AI와 인간의 관계</h2>
        <p className={styles.paragraph}>
          AI 기술이 발전함에 따라, 인간의 역할은 점점 더 불확실해지고 있습니다. Artisan은 판매, 마케팅, 채용, 재무, 디자인 등 다양한 분야로 AI 도구를 확장할 계획을 세우고 있습니다. 이러한 변화는 인간 노동자들에게 위협이 될 수 있으며, AI와 인간의 협업 방식에 대한 새로운 논의가 필요합니다. AI가 인간의 역할을 대체하는 것이 아니라, 인간과 AI가 협력하여 더 나은 결과를 만들어낼 수 있는 방법을 모색해야 할 때입니다.
        </p>

        <h2 className={styles.heading2}>결론: AI의 시대와 인간의 역할</h2>
        <p className={styles.paragraph}>
          Artisan의 광고 캠페인은 AI 기술의 발전이 가져오는 사회적 변화에 대한 경각심을 불러일으키고 있습니다. 그러나 이러한 변화가 반드시 부정적인 결과만을 초래하는 것은 아닙니다. AI와 인간이 협력하여 새로운 가치를 창출할 수 있는 가능성도 존재합니다. 앞으로의 AI 시대에서 인간의 역할은 무엇인지, 그리고 어떻게 AI와 함께 공존할 수 있을지를 고민해야 할 시점입니다.
        </p>

        <PostNavigation currentPostId={17} />
      </div>
    </>
  );
};

export default Post17; 