'use client'

import { useState } from 'react'
import { GalleryFilter } from './GalleryFilter'
import { GalleryItem } from './GalleryItem'

interface GalleryImage {
  id: string
  image: any
  title: string
  category: 'product' | 'project'
  link: string
}

interface GalleryClientProps {
  images: GalleryImage[]
}

export function GalleryClient({ images }: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'project'>('all')

  const filteredImages = images.filter((image) => {
    if (activeFilter === 'all') return true
    return image.category === activeFilter
  })

  return (
    <>
      <GalleryFilter onFilterChange={setActiveFilter} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredImages.map((item, index) => (
          <GalleryItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            category={item.category}
            link={item.link}
            index={index}
          />
        ))}
      </div>
    </>
  )
}

