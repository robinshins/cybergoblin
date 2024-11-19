import { useState } from 'react';
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

export default function Dogman() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '난 개저씨를 보면 알 수 있어. 대화해보자.'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
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

  const handleClosePopup = () => {
    setShowAdPopup(false);
    setAllowOneMessage(true);
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
        `${msg.role === 'assistant' ? '판별봇:' : ''}${msg.content}`
      );

      const response = await fetch('/api/chat', {
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
          console.log('Sending judgment request');
          const judgeResponse = await fetch('/api/judge', {
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
            throw new Error(`개저씨 판정 에러 (${judgeResponse.status}): ${judgeErrorText}`);
          }

          const judgeData = await judgeResponse.json();
          console.log('Judge API Response:', judgeData);

          if (judgeData.judgment) {
            setJudgmentText(judgeData.judgment);
            setShowResult(true);
          } else {
            throw new Error('개저씨 판정 결과가 없습니다.');
          }
        }
      } else {
        throw new Error('API 응답�� 메시지가 없습니다.');
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
          src="/images/민희진.jpg"
          alt="개저씨" 
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

  return (
    <>
      <Head>
        <title>개저씨 판별기 - 당신은 개저씨일까요?</title>
        <meta name="description" content="AI가 민희진봇이 판별해주는 재미있는 개저씨 테스트! 5번의 대화로 당신이 개저씨인지 아닌지 확인해보세요." />
        <meta property="og:title" content="개저씨 판별기 - 당신은 개저씨일까요?" />
        <meta property="og:description" content="AI가 민희진봇이 판별해주는 재미있는 개저씨 테스트! 5번의 대화로 당신이 개저씨인지 아닌지 확인해보세요." />
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
              src="/images/민희진.jpg"
              alt="개저씨" 
              width={96} 
              height={96}
              className="object-cover"
            />
          </div>
          <h1 className="chat-title">개저씨 판별기</h1>
          <p className="chat-description">
            5번의 대화 안에 당신이 개저씨인지 판별해드립니다.<br />
            솔직하게 대화해주세요!
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
                      src="/images/민희진.jpg"
                      alt="개저씨" 
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
              placeholder="개저씨 판별봇과 대화를 입력하세요."
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
              <h2 className="modal-title">판정 결과</h2>
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
            buttonText="뉴진스 관련 제품 구경하기"
            adLink="https://link.coupang.com/a/b0Mgqo"
          />
        )}
      </div>
    </>
  );
}
