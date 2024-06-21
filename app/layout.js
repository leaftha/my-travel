import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: '여행 기록기',
    description: '자신의 여행을 기록하는 사이트',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
