import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: '解决方案中心',
  description: '探索我们精心挑选的解决方案，为您的企业带来更高效的工作流程和更好的业务成果。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
