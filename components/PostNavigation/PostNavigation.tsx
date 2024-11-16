import React from 'react';
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
  // 추가 포스트들...
];

interface PostNavigationProps {
  currentPostId: number;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ currentPostId }) => {
  const postsPerPage = 10;
  const currentPage = currentPostId === 0 ? 1 : Math.ceil(currentPostId / postsPerPage);
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
          <Link 
            href={`/posts/post${(currentPage - 2) * postsPerPage + 1}`}
            className={styles.pageLink}
          >
            이전
          </Link>
        )}
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Link
            key={page}
            href={`/posts/post${(page - 1) * postsPerPage + 1}`}
            className={`${styles.pageLink} ${currentPage === page ? styles.activePage : ''}`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link 
            href={`/posts/post${currentPage * postsPerPage + 1}`}
            className={styles.pageLink}
          >
            다음
          </Link>
        )}
      </div>
    </nav>
  );
};

export default PostNavigation; 