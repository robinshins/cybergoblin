import { useState, useEffect } from 'react';
import Image from 'next/image';
import '@/styles/chat.css';
import { useRouter } from 'next/router';
import CoupangAd from '@/components/CoupangAd';
import AdPopup from '@/components/AdPopup';
import AdPopupButtonImage from '@/components/AdPopupButtonImage';
import Head from 'next/head';  // Head 추가

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const AD_EXPIRY_KEY = process.env.NEXT_PUBLIC_AD_EXPIRY_KEY || 'cybergoblin_ad_expiry';

export default function LucasTemperature() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '난 더울땐 자본주의를 떠올려. 차갑거든'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [temperature, setTemperature] = useState('');
  const [judgmentText, setJudgmentText] = useState('');
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [allowOneMessage, setAllowOneMessage] = useState(false);

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
        `${msg.role === 'assistant' ? '루카스:' : ''}${msg.content}`
      );

      const response = await fetch('/api/lucas/lucas_chat', {
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
        throw new Error(`API 응답 에러: ${response.status}`);
      }

      const data = await response.json();
      console.log('Chat API Response:', data);

      if (data.response) {
        const assistantMessage: ChatMessage = { 
          role: 'assistant', 
          content: data.response 
        };
        setMessages(prev => [...prev, assistantMessage]);

        if (isSixthMessage) {
          console.log('Sending temperature request');
          const judgeResponse = await fetch('/api/lucas/lucas_judge_temperature', {
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
            throw new Error(`온도 판정 에러 (${judgeResponse.status}): ${judgeErrorText}`);
          }

          const judgeData = await judgeResponse.json();
          console.log('Temperature API Response:', judgeData);

          if (judgeData.judgment) {
            const tempMatch = judgeData.judgment.match(/-?\d+/);
            if (tempMatch) {
              setTemperature(tempMatch[0]);
              setJudgmentText(judgeData.judgment);
              setShowResult(true);
            } else {
              throw new Error('온도 값을 찾을 수 없습니다.');
            }
          } else {
            throw new Error('온도 판정 결과가 없습니다.');
          }
        }
      } else {
        throw new Error('API 응답에 메시지가 없습니다.');
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

  const LoadingIndicator = () => (
    <div className="message assistant">
      <div className="message-avatar">
        <Image 
          src="/images/lucas.jpg"
          alt="루카스" 
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

  const handleClosePopup = () => {
    setShowAdPopup(false);
    setAllowOneMessage(true);
  };

  return (
    <>
    <Head>
    <title>루카스 온도 판별기 - 당신의 사상은 몇 도일까요?</title>
    <meta name="description" content="윤루카스 AI가 판별해주는 재미있는 온도 테스트! 5번의 대화로 당신의 체온을 측정해보세요." />
    <meta property="og:title" content="루카스 온도 판별기 - 당신의 체온은 몇 도일까요?" />
    <meta property="og:description" content="윤루카스 AI가 판별해주는 재미있는 온도 테스트! 5번의 대화로 당신의 체온을 측정해보세요." />
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
        <div className="profile-image">
          <Image 
            src="/images/lucas.jpg"
            alt="루카스" 
            width={96} 
            height={96}
            className="object-cover"
          />
        </div>
        <h1 className="chat-title">온도 판별기</h1>
        <p className="chat-description">
          윤루카스님의 유튜브 영상을 학습한 루카스봇이<br />
          5번의 대화 안에 당신이 몇 도인지 판별 해드립니다.
        </p>
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
                    src="/images/lucas.jpg"
                    alt="루카스" 
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
            placeholder="루카스봇과의 대화를 입력하세요."
            disabled={isLoading || showResult || showAdPopup}
          />
          <button
            type="submit"
            className="send-button"
            disabled={isLoading || showResult || showAdPopup}
          >
            전송
          </button>
        </form>
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
            <h2 className="modal-title">당신의 온도는...</h2>
            <p className="temperature-result">{temperature}°C</p>
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
        <AdPopupButtonImage
          onClose={handleClosePopup}
          onAdClick={handleAdClick}
          buttonText="쿠팡 방문하기"
          adLink="https://link.coupang.com/a/b0UZSj"
        imageUrl="https://image9.coupangcdn.com/image/retail-product-api/A00077021/192758000/208805540/main/9791192372488_L.jpg"
      />
        // <AdPopup 
        //   onClose={handleClosePopup} 
        //   onAdClick={handleAdClick}
        // />
      )}
    </div>
    </>
  );
}
