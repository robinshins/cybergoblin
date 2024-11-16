import { useEffect, useState } from 'react';
import CoupangLucasAd from './CoupangLucasAd';

interface AdPopupProps {
  onClose: () => void;
  onAdClick: () => void;
}

const AdPopup = ({ onClose, onAdClick }: AdPopupProps) => {
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
    onAdClick();
    onClose();
  };

  return (
    <>
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
            borderRadius: '8px',
            position: 'relative',
            maxWidth: '400px',
            width: '90%',
            zIndex: 9999
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {canClose ? (
              <button 
                onClick={onClose}
                style={{
                  fontSize: '14px',
                  color: '#666',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none'
                }}
              >
                ✕
              </button>
            ) : (
              <span style={{ fontSize: '14px', color: '#666' }}>{countdown}</span>
            )}
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            textAlign: 'center',
            marginTop: '16px'
          }}>
            쿠팡 방문 후, 2시간동안 무료로 채팅 계속하기
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CoupangLucasAd onAdClick={handleAdClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdPopup; 