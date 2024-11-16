import { useEffect, useState } from 'react';

const CoupangAd = () => {
  const [adSize, setAdSize] = useState({ width: "680", height: "140" });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setAdSize({ width: "320", height: "100" });
      } else {
        setAdSize({ width: "680", height: "140" });
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
      <iframe 
        src={`https://ads-partners.coupang.com/widgets.html?id=820745&template=carousel&trackingCode=AF9805563&subId=&width=${adSize.width}&height=${adSize.height}&tsource=`}
        width={adSize.width}
        height={adSize.height}
        frameBorder="0"
        scrolling="no"
        referrerPolicy="unsafe-url"
      />
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

export default CoupangAd; 