import AuthContext from './context/AuthContext';
import { AvatarProvider } from './context/AvatarContext';
import './globals.css';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'Disney',
  description: 'Disney+ | Movies and Shows',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <AvatarProvider>
          <AuthContext>{children}</AuthContext>
        </AvatarProvider>
      </body>
    </html>
  );
}
