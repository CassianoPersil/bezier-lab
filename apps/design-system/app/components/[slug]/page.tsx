import React from 'react'
import { DSTopNav } from '../../components/DSTopNav'
import { ComponentsClient } from './ComponentsClient'

export const dynamicParams = false

export function generateStaticParams() {
  return [
    { slug: 'button' },
    { slug: 'badge' },
    { slug: 'card' },
    { slug: 'input' },
    { slug: 'select' },
    { slug: 'dialog' },
    { slug: 'table' },
    { slug: 'avatar' },
    { slug: 'toast' },
    { slug: 'sidebar' },
    { slug: 'tabs' },
    { slug: 'spinner' },
  ]
}

interface ComponentPageProps {
  params: {
    slug: string
  }
}

export default function ComponentPage({ params }: ComponentPageProps) {
  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <DSTopNav />
      <ComponentsClient slug={params.slug} />
    </div>
  )
}
