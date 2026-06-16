import React from 'react'
import { DSTopNav } from '../../components/DSTopNav'
import { TokensClient } from './TokensClient'

export const dynamicParams = false

export function generateStaticParams() {
  return [
    { slug: 'typography' },
    { slug: 'spacing' },
    { slug: 'elevation' },
  ]
}

interface TokensPageProps {
  params: {
    slug: string
  }
}

export default function TokensPage({ params }: TokensPageProps) {
  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <DSTopNav />
      <TokensClient slug={params.slug} />
    </div>
  )
}
