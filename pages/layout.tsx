import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Taplist',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name='theme-color' content='#000000' />
        <link href='./index.css' rel='stylesheet' />
        <title>Taplist</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id='root' className='bg-white text-black w-screen h-screen overflow-auto print:h-auto px-8'>
          {children}
        </div>
      </body>
    </html>
  );
}
