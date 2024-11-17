import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ads-partners.coupang.com https://coupa.ng;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: blob: https: http:;
            font-src 'self' data:;
            connect-src 'self' https: http: ws: wss:;
            frame-src 'self' https://ads-partners.coupang.com https://coupa.ng;
            object-src 'none'
          "
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 