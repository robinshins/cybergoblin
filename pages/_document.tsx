import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MV26KFG2WF"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MV26KFG2WF');
            `,
          }}
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ads-partners.coupang.com https://coupa.ng https://www.googletagmanager.com;
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