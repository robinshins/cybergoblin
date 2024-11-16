import './styles/page.css'
import type { Metadata, Viewport } from 'next'
import PostNavigation from '@/components/PostNavigation/PostNavigation'

export const metadata: Metadata = {
  title: '사이버도깨비 클럽 | AI 챗봇 & GPTs 체험공간',
  description: '사이버도깨비가 만드는 AI 챗봇과 GPTs를 체험할 수 있는 공간입니다. 윤루카스봇, 민희진봇 등 다양한 AI 서비스를 무료로 이용해보세요.',
  openGraph: {
    title: '사이버도깨비 클럽 | AI 챗봇 & GPTs 체험공간',
    description: '사이버도깨비가 만드는 AI 챗봇과 GPTs를 체험할 수 있는 공간입니다.',
    images: ['/images/cybergoblin.webp'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function Home() {
  return (
    <main className="main-container">
      <header className="header-section">
        <div className="character-container">
          <img 
            src="/images/cybergoblin.webp" 
            alt="사이버도깨비" 
            className="dokkaebi-character"
          />
        </div>
        <h1 className="site-title">
          사이버도깨비 클럽
        </h1>
        <p className="site-description">
          사이버도깨비가 만드는 장난감들을 체험할 수 있는 공간입니다.
        </p>
      </header>

      <nav className="social-links" aria-label="소셜 미디어 링크">
        <a href="https://www.youtube.com/@ai_gobllin" 
           className="youtube-icon"
           target="_blank" rel="noopener noreferrer">
          <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/ai_gobllin/"
           className="instagram-icon"
           target="_blank" rel="noopener noreferrer">
          <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="https://www.tiktok.com/@ai_gobllin"
           className="tiktok-icon"
           target="_blank" rel="noopener noreferrer">
          <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        </a>
      </nav>

      <section className="chat-buttons" aria-label="AI 챗봇 목록">
        {['chat1', 'chat2', 'chat3'].map((chatId, index) => (
          <a 
            href={
              index === 0 ? '/chats/lucas-temperature' :
              index === 1 ? '/chats/lucas-gay' : '/chats/dogman'
            } 
            className={`chat-card chat-card-${index + 1} hover-effect`}
            key={chatId}
          >
            <div className="chat-image-wrapper">
              <img 
                src={`/images/${
                  index === 0 ? 'lucas.jpg' :
                  index === 1 ? '윤루카스게이.webp' : '민희진.jpg'
                }`} 
                alt={`Chat ${index + 1}`} 
                className="chat-image"
              />
            </div>
            <div className="chat-content">
              <h2 className="chat-title">
                {index === 0 ? '윤루카스 온도 계산봇' :
                index === 1 ? '윤루카스 게이 판별봇' : '민희진 개저씨 판별봇'}
              </h2>
              <p className="chat-description">
                {index === 0 ? '차가운 윤루카스가 당신이 몇도인지 알려줍니다.' :
                index === 1 ? '절대 게이가 아닌 윤루카스가 당신이 게이인지 알려줍니다.' : '민희진이 당신이 개저씨인지 알려줍니다.'}
              </p>
            </div>
          </a>
        ))}
      </section>

      <section className="gpts-section" aria-label="GPTs 서비스">
        <h2 className="gpts-title">GPTs 리스트</h2>
        <p className="gpts-description">
          도깨비가 만든 GPTs로 놀아보세요.<br />
          5.30일부터 모든 사용자에게 무료로 공개되었어요!
        </p>

        <div className="gpts-buttons">
          <a 
            href="https://chat.openai.com/g/g-민희진봇링크" 
            className="gpt-button minhee-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>민희진봇</h3>
            <p>GPTs로 만들어진 민희진 봇입니다.<br />
               솔직한 민희진봇과 다양한 대화를 진행해보세요.</p>
          </a>

          <a 
            href="https://chat.openai.com/g/g-코인봇링크" 
            className="gpt-button coin-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>코인투자 전문가</h3>
            <p>코인 차트를 캡쳐해서 첨부하면,<br />
               목표 매수/매도가는 물론 stop loss 가격까지 조언해줍니다.</p>
          </a>
        </div>
      </section>

      <section className="posts-section" aria-label="AI 정보글">
        <PostNavigation currentPostId={0} />
      </section>
    </main>
  )
} 