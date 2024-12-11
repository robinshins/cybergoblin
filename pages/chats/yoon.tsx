import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import '@/styles/chat.css';
import { useRouter } from 'next/router';
import AdPopupButton from '@/components/AdPopupButton';
import CoupangAd from '@/components/CoupangAd';
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const AD_EXPIRY_KEY = process.env.NEXT_PUBLIC_AD_EXPIRY_KEY || 'cybergoblin_ad_expiry';

export default function Yoon() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '이번 비상계엄 선포는 국정 최종 책임자인 대통령으로서의 절박함에서 비롯되었습니다.'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [judgmentText, setJudgmentText] = useState('');
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [allowOneMessage, setAllowOneMessage] = useState(false);
  const [gifKey, setGifKey] = useState(0);
  const gifRef = useRef<HTMLImageElement>(null);
  const [profileGifKey, setProfileGifKey] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState('/images/yoon2.mp4');
  const [judgmentVideo, setJudgmentVideo] = useState('');

  const checkAdExpiry = () => {
    const expiryTime = localStorage.getItem(AD_EXPIRY_KEY);
    if (!expiryTime) return false;
    
    const isValid = new Date().getTime() < parseInt(expiryTime);
    if (!isValid) {
      localStorage.removeItem(AD_EXPIRY_KEY);
    }
    return isValid;
  };

  const handleAdClick = () => {
    const expiryTime = new Date().getTime() + (2 * 60 * 60 * 1000); // 2시간
    localStorage.setItem(AD_EXPIRY_KEY, expiryTime.toString());
  };

  const handleClosePopup = () => {
    setShowAdPopup(false);
    setAllowOneMessage(true);
  };

  useEffect(() => {
    if (gifRef.current) {
      gifRef.current.src = `/images/yoon1.gif?key=${gifKey}`;
    }
  }, [gifKey]);

  useEffect(() => {
    setProfileGifKey(1);
  }, []);

  useEffect(() => {
    setPlayVideo(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const getRandomVideo = () => {
    const videos = ['yoon1.mp4', 'yoon2.mp4', 'yoon3.mp4'];
    const randomIndex = Math.floor(Math.random() * videos.length);
    return `/images/${videos[randomIndex]}`;
  };

  const determineJudgmentVideo = (judgment: string) => {
    // 패배/인정 관련 키워드
    const loseKeywords = ['잘못', '사과', '죄송', '실수', '인정', '반성', '후회'];
    // 승리/고수 관련 키워드
    const winKeywords = ['정당', '당연', '맞', '확신', '절대', '필요', '해야'];
    
    // 각 키워드 타입별 출현 횟수 계산
    const loseCount = loseKeywords.reduce((count, keyword) => 
      count + (judgment.includes(keyword) ? 1 : 0), 0);
    const winCount = winKeywords.reduce((count, keyword) => 
      count + (judgment.includes(keyword) ? 1 : 0), 0);
    
    if (loseCount > winCount) {
      return '/images/yoon_lose.mp4';
    } else if (winCount > loseCount) {
      return '/images/yoon_win.mp4';
    }
    return '/images/yoon_middle.mp4';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    if (!checkAdExpiry() && !allowOneMessage) {
      setShowAdPopup(true);
      return;
    }

    if (allowOneMessage) {
      setAllowOneMessage(false);
    }

    if (messages.length >= 10) {
      const errorMessage: ChatMessage = { 
        role: 'assistant', 
        content: '5번이 넘어 더 이상 채팅을 진행할 수 없습니다.' 
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const newMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const isSixthMessage = messages.length === 9;
      const chatHistory = messages.map(msg => 
        `${msg.role === 'assistant' ? '석열봇:' : ''}${msg.content}`
      );

      const response = await fetch('/api/yoon_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_input: userInput,
          chat_history: chatHistory
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 답 에러: ${response.status}`);
      }

      const data = await response.json();
      console.log('Chat API Response:', data);

      if (data.response) {
        const assistantMessage: ChatMessage = { 
          role: 'assistant', 
          content: data.response 
        };
        setMessages(prev => [...prev, assistantMessage]);
        setGifKey(prevKey => prevKey + 1);
        setProfileGifKey(prevKey => prevKey + 1);
        setCurrentVideo(getRandomVideo());
        setPlayVideo(true);

        if (isSixthMessage) {
          console.log('Sending judgment request');
          const judgeResponse = await fetch('/api/yoon_judge', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              chat_history: [...chatHistory, userInput, data.response]
            })
          });

          if (!judgeResponse.ok) {
            const judgeErrorText = await judgeResponse.text();
            throw new Error(`에러 (${judgeResponse.status}): ${judgeErrorText}`);
          }

          const judgeData = await judgeResponse.json();
          console.log('Judge API Response:', judgeData);

          if (judgeData.judgment) {
            setJudgmentText(judgeData.judgment);
            setJudgmentVideo(determineJudgmentVideo(judgeData.judgment));
            setShowResult(true);
          } else {
            throw new Error('윤석열 판단 결과가 없습니다.');
          }
        }
      } else {
        throw new Error('API 응답 메시지가 없습니다.');
      }
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      const errorMessage: ChatMessage = { 
        role: 'assistant', 
        content: `죄송합니다. 오류가 발생했습니다: ${error.message}` 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setUserInput('');
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (playVideo) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [playVideo]);

  const LoadingIndicator = () => (
    <div className="message assistant">
      <div className="message-avatar">
        <Image
          ref={gifRef}
          src={`/images/yoon1.gif?key=${gifKey}`}
          alt="석열봇ㄴ"
          width={32}
          height={32}
          className="object-cover"
        />
      </div>
      <div className="message-bubble">
        <span className="loading-dots">생각중...</span>
      </div>
    </div>
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL이 복사되었습니다!');
    } catch (err) {
      alert('URL 복사에 실패했습니다.');
    }
  };

  const closeResult = () => {
    setShowResult(false);
  };

  const openResult = () => {
    setShowResult(true);
  };

  return (
    <>
      <Head>
        <title>윤석열 계엄 청문봇</title>
        <meta name="description" content="석열봇에게 무엇이든 물어보세요. 5번의 대화 이후 계엄에 대해서 석열봇이 스스로 판단을 내립니다." />
        <meta property="og:title" content="윤석열 계엄 청문봇" />
        <meta property="og:description" content="석열봇에게 무엇이든 물어보세요. 5번의 대화 이후 계엄에 대해서 석열봇이 스스로 판단을 내립니다." />
        <meta property="og:type" content="website" />
      </Head>
      <div className="chat-container">
        <div className="chat-header">
          <button
            onClick={() => router.push('/')}
            className="home-button"
          >
            홈으로 가기 🏠
          </button>
          <div className="profile-yoon">
            <Image
              src="/images/yoon2.gif"
              alt="윤석열"
              width={200}
              height={200}
              className="object-cover"
            />
          </div>
          <h1 className="chat-title">윤석열 계엄 청문봇</h1>
          <p className="chat-description">
            5번의 대화안에 석열봇으로부터 원하는 말을 들어보세요 <br/>
            석열봇은 대통령실 홈페이지의 '대통령의 말과 글' <br/>
            내용들을 학습했습니다.
          </p>
          <a 
            href="https://www.youtube.com/watch?v=LFYf8peVPLs&t"
            className="learn-more-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            석열봇 자세히 알아보기 <svg className="youtube-icon-small" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>
        </div>

        <div className="chat-area">
          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role}`}
              >
                {message.role === 'assistant' && (
                  <div className="message-avatar">
                    <Image
                      ref={gifRef}
                      src={`/images/yoon1.gif?key=${gifKey}`}
                      alt="석열봇"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="message-bubble">
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && <LoadingIndicator />}
          </div>
        </div>

        <div className="input-container">
          <form onSubmit={handleSubmit} className="chat-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="chat-input"
              placeholder="석열봇과의 대화를 입력하세요."
              disabled={isLoading || showResult}
            />
            <button
              type="submit"
              className="send-button"
              disabled={isLoading || showResult}
            >
              전송
            </button>
          </form>
          {messages.length >= 10 && !showResult && (
            <button onClick={openResult} className="view-result-button">
              판정 결과 다시 보기
            </button>
          )}
          <p className="disclaimer">
            본 챗봇은 AI일 뿐, 실제 인물과는 무관합니다.
          </p>
        </div>
        <CoupangAd />
        <br/>
        <br/>
        <br/>
        

        {showResult && (
          <div className="result-modal">
            <div className="modal-content">
              <button onClick={closeResult} className="close-button">×</button>
              <div className="judgment-video">
                <video
                  autoPlay
                  muted
                  loop
                  className="result-video"
                  src={judgmentVideo}
                />
              </div>
              <h2 className="modal-title">석열봇의 판단</h2>
              <p className="judgment-text">{judgmentText}</p>
              <div className="modal-buttons">
                <button
                  onClick={copyToClipboard}
                  className="share-button"
                >
                  공유하기 🔗
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="modal-home-button"
                >
                  다른 챗봇하러 가기 👻
                </button>
              </div>
            </div>
          </div>
        )}

        {showAdPopup && (
          <AdPopupButton 
            onClose={handleClosePopup}
            onAdClick={handleAdClick}
            buttonText="쿠팡 광고 보기"
            adLink="https://link.coupang.com/a/b4lKzS"
          />
        )}
      </div>
    </>
  );
}
