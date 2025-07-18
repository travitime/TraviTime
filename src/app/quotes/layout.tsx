import { ReactNode } from 'react'

interface QuoteLayoutProps {
  children: ReactNode
}

export default function QuoteLayout({ children }: QuoteLayoutProps) {
  return (
    <div className="quote-layout">
      {children}
    </div>
  )
} 