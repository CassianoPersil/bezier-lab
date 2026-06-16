import React from 'react'
import { DSTopNav } from '../../components/DSTopNav'
import { GuidelinesClient } from './GuidelinesClient'

export const dynamicParams = false

export function generateStaticParams() {
  return [
    { slug: 'brand' },
    { slug: 'motion' },
    { slug: 'accessibility' },
  ]
}

interface GuidelinesPageProps {
  params: {
    slug: string
  }
}

export default function GuidelinesPage({ params }: GuidelinesPageProps) {
  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <DSTopNav />
      <GuidelinesClient slug={params.slug} />
    </div>
  )
}
