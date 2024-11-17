import React from 'react';
import styles from './Post.module.css';
import PostNavigation from '@/components/PostNavigation/PostNavigation';
import Link from 'next/link';

const Post1 = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.homeButton}>
      홈으로 🏠
      </Link>
      <h1 className={styles.title}>ComfyUI를 활용한 실시간 이미지 생성 시스템 구축하기</h1>

      <p className={styles.paragraph}>
        ComfyUI는 Stable Diffusion을 기반으로 한 강력한 이미지 생성 도구입니다. 이 글에서는 ComfyUI를 활용하여 실시간으로 이미지를 생성하는 시스템을 구축하는 방법을 상세히 알아보겠습니다. 이 시스템은 웹 인터페이스를 통해 사용자 입력을 받아 즉시 이미지를 생성하고 표시할 수 있습니다.
      </p>

      <h2 className={styles.heading2}>1. 시스템 구성 요소</h2>
      <p className={styles.paragraph}>실시간 이미지 생성 시스템은 다음과 같은 구성 요소로 이루어집니다:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong className={styles.strong}>ComfyUI 백엔드:</strong> 이미지 생성을 담당하는 핵심 엔진
        </li>
        <li className={styles.listItem}>
          <strong className={styles.strong}>웹 서버:</strong> 사용자 인터페이스를 제공하고 ComfyUI와 통신
        </li>
        <li className={styles.listItem}>
          <strong className={styles.strong}>데이터베이스:</strong> 생성된 이미지와 관련 정보 저장
        </li>
        <li className={styles.listItem}>
          <strong className={styles.strong}>프론트엔드:</strong> 사용자와 상호작용하는 웹 인터페이스
        </li>
      </ul>

      <h2 className={styles.heading2}>2. 시스템 구축 단계</h2>

      <h3 className={styles.heading3}>2.1 ComfyUI 설정</h3>
      <ol className={styles.list}>
        <li className={styles.listItem}>
          <p className={styles.paragraph}>ComfyUI 리포지토리를 클론합니다:</p>
          <pre className={styles.codeBlock}>
            <code>git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI</code>
          </pre>
        </li>
        <li className={styles.listItem}>
          <p className={styles.paragraph}>필요한 의존성을 설치합니다:</p>
          <pre className={styles.codeBlock}>
            <code>pip install -r requirements.txt</code>
          </pre>
        </li>
        <li className={styles.listItem}>
          <p className={styles.paragraph}>원하는 Stable Diffusion 모델을 'models/checkpoints' 폴더에 다운로드합니다.</p>
        </li>
        <li className={styles.listItem}>
          <p className={styles.paragraph}>ComfyUI를 API 모드로 실행합니다:</p>
          <pre className={styles.codeBlock}>
            <code>python main.py --listen</code>
          </pre>
        </li>
      </ol>

      <h3 className={styles.heading3}>2.2 웹 서버 설정 (Flask 사용 예시)</h3>
      <ol className={styles.list}>
        <li className={styles.listItem}>
          <p className={styles.paragraph}>Flask와 필요한 라이브러리를 설치합니다:</p>
          <pre className={styles.codeBlock}>
            <code>pip install flask requests</code>
          </pre>
        </li>
        <li className={styles.listItem}>
          <p className={styles.paragraph}>Flask 애플리케이션 코드 예시:</p>
          <pre className={styles.codeBlock}>
            <code>{`from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate_image():
    prompt = request.json['prompt']
    comfy_response = requests.post('http://127.0.0.1:8188/prompt', json={
        "prompt": {
            "3": {
                "inputs": {
                    "text": prompt,
                    "clip": ["4", 0]
                },
                "class_type": "CLIPTextEncode"
            },
            "4": {
                "inputs": {
                    "ckpt_name": "v1-5-pruned.ckpt"
                },
                "class_type": "CheckpointLoaderSimple"
            }
            // ... 추가 설정
        }
    })
    return jsonify({'image_url': comfy_response.json()['url']})

if __name__ == '__main__':
    app.run(debug=True)`}</code>
          </pre>
        </li>
      </ol>

      <h3 className={styles.heading3}>2.3 프론트엔드 구현</h3>
      <p className={styles.paragraph}>기본적인 프론트엔드 구현 예시:</p>
      <pre className={styles.codeBlock}>
        <code>{`<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>실시간 이미지 생성</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
    <h1>실시간 이미지 생성</h1>
    <input type="text" id="prompt" placeholder="프롬프트를 입력하세요">
    <button onclick="generateImage()">이미지 생성</button>
    <div id="result"></div>

    <script>
    function generateImage() {
        var prompt = $('#prompt').val();
        $.ajax({
            url: '/generate',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({prompt: prompt}),
            success: function(response) {
                $('#result').html('<img src="' + response.image_url + '">');
            }
        });
    }
    </script>
</body>
</html>`}</code>
      </pre>

      <h2 className={styles.heading2}>3. 시스템 최적화 및 확장</h2>
      
      <h3 className={styles.heading3}>3.1 캐싱 구현</h3>
      <p className={styles.paragraph}>
        자주 요청되는 프롬프트에 대한 결과를 캐싱하여 응답 시간을 단축할 수 있습니다. Redis와 같은 인메모리 데이터베이스를 사용하여 구현할 수 있습니다.
      </p>

      <h3 className={styles.heading3}>3.2 로드 밸런싱</h3>
      <p className={styles.paragraph}>
        여러 ComfyUI 인스턴스를 실행하고 Nginx와 같은 로드 밸런서를 사용하여 요청을 분산시킬 수 있습니다. 이를 통해 시스템의 처리량을 늘릴 수 있습니다.
      </p>

      <h3 className={styles.heading3}>3.3 비동기 처리</h3>
      <p className={styles.paragraph}>
        이미지 생성 작업을 비동기적으로 처리하고, 웹소켓을 사용하여 실시간으로 진행 상황을 클라이언트에 전달할 수 있습니다.
      </p>

      <h2 className={styles.heading2}>4. 보안 고려사항</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong className={styles.strong}>입력 검증:</strong> 사용자 입력을 철저히 검증하여 악의적인 프롬프트를 차단합니다.
        </li>
        <li className={styles.listItem}>
          <strong className={styles.strong}>API 인증:</strong> ComfyUI API에 접근 토큰을 구현하여 무단 접근을 방지합니다.
        </li>
        <li className={styles.listItem}>
          <strong className={styles.strong}>HTTPS:</strong> 모든 통신에 HTTPS를 사용하여 데이터를 암호화합니다.
        </li>
        <li className={styles.listItem}>
          <strong className={styles.strong}>이미지 필터링:</strong> 생성된 이미지를 검토하여 부적절한 콘텐츠를 필터링합니다.
        </li>
      </ul>

      <h2 className={styles.heading2}>5. 사용 예시</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong className={styles.strong}>개인화된 아바타 생성기:</strong> 사용자의 설명을 바탕으로 맞춤형 아바타를 실시간으로 생성합니다.
        </li>
        <li className={styles.listItem}>
          <strong className={styles.strong}>실시간 스토리북 일러스트레이터:</strong> 사용자가 입력한 이야기 내용을 바탕으로 실시간으로 일러스트를 생성합니다.
        </li>
        <li className={styles.listItem}>
          <strong className={styles.strong}>디자인 아이디어 생성기:</strong> 디자이너가 입력한 키워드를 바탕으로 다양한 디자인 아이디어를 실시간으로 제안합니다.
        </li>
      </ul>

      <h2 className={styles.heading2}>결론</h2>
      <p className={styles.paragraph}>
        ComfyUI를 활용한 실시간 이미지 생성 시스템은 다양한 창의적 애플리케이션에 활용될 수 있는 강력한 도구입니다. 이 시스템을 구축함으로써, 사용자의 아이디어를 즉각적으로 시각화하고, 창의적 과정을 가속화할 수 있습니다. 지속적인 최적화와 보안 강화를 통해, 더욱 효율적이고 안전한 시스템으로 발전시킬 수 있을 것입니다.
      </p>
      <PostNavigation currentPostId={1} />
    </div>
    
  );
};

export default Post1;
