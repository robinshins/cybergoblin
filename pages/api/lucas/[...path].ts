import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: '허용되지 않는 메서드입니다.' });
  }

  const { path } = req.query;
  const API_URL = 'https://heejinbot-5ldkgdkr2q-uc.a.run.app';
  
  try {
    // Basic Auth 헤더 생성
    const credentials = Buffer.from('rageagainstheai:rageagainstheai098!').toString('base64');
    
    // API 엔드포인트 매핑
    if (!path || !Array.isArray(path)) {
      return res.status(400).json({ error: '잘못된 경로입니다.' });
    }

    let endpoint = '';
    if (path[0] === 'lucas_chat') {
      endpoint = 'lucas_chat/';
    } else if (path[0] === 'lucas_judge_temperature') {
      endpoint = 'lucas_judge_temperature/';
    } else if (path[0] === 'lucas_judge_gay') {
      endpoint = 'lucas_judge_gay/';
    } else if (path[0] === 'chat') {
      endpoint = 'chat/';
    } else if (path[0] === 'judge') {
      endpoint = 'judge/';
    } else {
      return res.status(404).json({ error: '잘못된 엔드포인트입니다.' });
    }

    //console.log('Forwarding request to:', `${API_URL}/${endpoint}`);
    //console.log('Request body:', req.body);

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      return res.status(response.status).json({ 
        error: `API 오류: ${response.status} ${response.statusText}`,
        details: errorText
      });
    }

    const data = await response.json();
    //console.log('API Response:', data);
    
    return res.status(200).json(data);
  } catch (error: any) {
    //console.error('Server Error:', error);
    return res.status(500).json({ 
      error: '서버 오류가 발생했습니다.',
      details: error.message 
    });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}; 