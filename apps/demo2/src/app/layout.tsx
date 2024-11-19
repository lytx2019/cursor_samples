import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/auth'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: '解决方案中心',
  description: '探索我们精心挑选的解决方案，为您的企业带来更高效的工作流程和更好的业务成果。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
