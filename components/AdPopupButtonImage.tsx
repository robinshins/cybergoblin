import { useEffect, useState } from 'react';

interface AdPopupButtonProps {
  onClose: () => void;
  onAdClick: () => void;
  buttonText: string;
  adLink: string;
  imageUrl: string;
}

const AdPopupButtonImage = ({ onClose, onAdClick, buttonText, adLink, imageUrl }: AdPopupButtonProps) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanClose(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAdClick = () => {
    window.open(adLink, '_blank');
    onAdClick();
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '16px',
          position: 'relative',
          maxWidth: '400px',
          width: '90%',
          zIndex: 9999,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px'
          }}
        >
          {canClose ? (
            <button 
              onClick={onClose}
              style={{
                fontSize: '16px',
                color: '#666',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                padding: '8px'
              }}
            >
              ✕
            </button>
          ) : (
            <span style={{ fontSize: '16px', color: '#666' }}>{countdown}</span>
          )}
        </div>
        <div 
          onClick={handleAdClick}
          style={{
            cursor: 'pointer',
            marginBottom: '16px',
            maxHeight: '200px',
            overflow: 'hidden'
          }}
        >
          <img 
            src={imageUrl}
            alt="광고 이미지"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '200px',
              objectFit: 'contain',
              borderRadius: '8px',
              transition: 'transform 0.2s',
            }}
          />
        </div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '16px',
          textAlign: 'center',
          color: '#333'
        }}>
          쿠팡 방문하고 2시간동안 <br/>무료로 채팅 계속하기
        </h2>
        <button
          onClick={handleAdClick}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#FF9900',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginBottom: '12px'
          }}
        >
          {buttonText}
        </button>
        <p style={{
          fontSize: '12px',
          color: '#666',
          textAlign: 'center',
          margin: 0
        }}>
          본 광고는 쿠팡 파트너스 활동의 일환으로, <br/>이에 따른 일정액의 수수료를 제공받습니다.
        </p>
      </div>
    </div>
  );
};

export default AdPopupButtonImage;
