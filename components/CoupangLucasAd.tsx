import { useEffect, useState } from 'react';

interface CoupangLucasAdProps {
  onAdClick?: () => void;
}

const CoupangLucasAd = ({ onAdClick }: CoupangLucasAdProps) => {
  const [adSize, setAdSize] = useState({ width: "120", height: "240" });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setAdSize({ width: "120", height: "240" });
      } else {
        setAdSize({ width: "120", height: "240" });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <a 
        href="https://coupa.ng/cgC8QC" 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ cursor: 'pointer' }}
        onClick={onAdClick}
      >
        <iframe 
          src="https://coupa.ng/cgC8QC"
          width={adSize.width}
          height={adSize.height}
          frameBorder="0"
          scrolling="no"
          referrerPolicy="unsafe-url"
          style={{ pointerEvents: 'none' }}
        />
      </a>
      <p 
        style={{
          fontSize: '11px',
          color: '#666',
          textAlign: 'center',
          margin: '4px 0 0 0',
          padding: '0',
          fontWeight: '300',
          lineHeight: '1.2'
        }}
      >
        본 광고배너는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받을 수 있습니다.
      </p>
    </div>
  );
};

export default CoupangLucasAd;
