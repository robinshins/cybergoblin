'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './PostNavigation.module.css';

interface PostData {
  id: number;
  title: string;
  date: string;
}

const posts: PostData[] = [
  { id: 1, title: "ComfyUI를 활용한 실시간 이미지 생성 시스템 구축하기", date: "2024-07-20" },
  { id: 2, title: "AI 이미지 생성 기술의 발전과 그 적용 분야", date: "2024-07-21" },
  { id: 3, title: "챗봇과 인간의 정서적인 상호작용", date: "2024-11-10" },
  { id: 4, title: "AI가 정치에 미칠 수 있는 영향", date: "2024-11-11" },
  { id: 5, title: "AI와 WEB3는 서로 친구가 될 수 있을까?", date: "2024-11-12" },
  { id: 6, title: "AI가 정치인을 대체할 수 있을까?", date: "2024-11-13" },
  { id: 7, title: "AGI란 무엇이고 왜 이슈가 되는가?", date: "2024-11-14" },
  { id: 8, title: "AGI와 초지능은 무엇이 다른가?", date: "2024-11-15" },
  { id: 9, title: "AI 시대, 대학과 교수의 역할은 무엇인가?", date: "2024-11-16" },
  { id: 10, title: "AI 기술 발전은 부의 양극화를 심화시킬까 완화시킬까?", date: "2024-11-17" },
  { id: 11, title: "AI 유토피아와 디스토피아 : 유토피아편", date: "2024-11-18" },  
  { id: 12, title: "AI가 초래할 디스토피아: 어둠의 미래를 경계하다", date: "2024-11-19" },
  { id: 13, title: "자기 개선 인공지능: 미래의 가능성과 위험", date: "2024-11-20" },
  { id: 14, title: "산타 모드: ChatGPT에서 만나는 크리스마스의 마법", date: "2024-11-21" },
  { id: 15, title: "언어 모델의 비언어적 추론 능력", date: "2024-11-22" },
  { id: 16, title: "구글의 Gemini 2.0: 에이전트 AI의 새로운 시대", date: "2024-11-23" },
  { id: 17, title: "AI 회사, 샌프란시스코에서 “인간 고용 중단” 광고 캠페인", date: "2024-11-24" },
  { id: 18, title: "AI 음성 클론으로부터 가족을 보호하는 방법", date: "2024-11-25" },
  { id: 19, title: "AI 복지: 윤리의 새로운 경계", date: "2024-11-26" },
  { id: 20, title: "트럼프, 바이든의 AI 안전 조치 해체 계획", date: "2024-11-27" },


  // 추가 포스트들...
];

interface PostNavigationProps {
  currentPostId: number;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ currentPostId }) => {
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(currentPostId === 0 ? 1 : Math.ceil(currentPostId / postsPerPage));
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const visiblePosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <nav className={styles.navigation}>
      <h2 className={styles.sectionTitle}>AI 정보글 목록</h2>
      
      <div className={styles.postList}>
        {visiblePosts.map(post => (
          <Link 
            href={`/posts/post${post.id}`} 
            key={post.id}
            className={`${styles.postLink} ${currentPostId !== 0 && currentPostId === post.id ? styles.active : ''}`}
          >
            <div className={styles.postItem}>
              <span className={styles.postTitle}>{post.title}</span>
              <span className={styles.postDate}>{post.date}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button 
            onClick={() => setCurrentPage(currentPage - 1)}
            className={styles.pageLink}
          >
            이전
          </button>
        )}
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${styles.pageLink} ${currentPage === page ? styles.activePage : ''}`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button 
            onClick={() => setCurrentPage(currentPage + 1)}
            className={styles.pageLink}
          >
            다음
          </button>
        )}
      </div>
    </nav>
  );
};

export default PostNavigation; 