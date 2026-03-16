'use client'

import Link from 'next/link'
import ProductGrid from './product-grid'

interface CollectionSectionProps {
  collection: any
}

export default function CollectionSection({ collection }: CollectionSectionProps) {
  const description = collection.metadata?.description
  const hasDescription = typeof description === 'string' && description

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {collection.title}
            </h2>
            {hasDescription && (
              <p className="text-gray-600 mt-2">{description}</p>
            )}
          </div>
          <Link
            href={`/collections/${collection.handle}`}
            className="text-blue-600 hover:text-blue-700 font-semibold whitespace-nowrap"
          >
            View all →
          </Link>
        </div>
        <ProductGrid collectionId={collection.id} limit={4} />
      </div>
    </section>
  )
}
