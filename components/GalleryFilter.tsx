'use client'

import { useState } from 'react'

interface GalleryFilterProps {
  onFilterChange: (filter: 'all' | 'product' | 'project') => void
}

export function GalleryFilter({ onFilterChange }: GalleryFilterProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'project'>('all')

  const filters = [
    { id: 'all' as const, label: 'All' },
    { id: 'product' as const, label: 'Products' },
    { id: 'project' as const, label: 'Projects' },
  ]

  const handleFilter = (filter: 'all' | 'product' | 'project') => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }

  return (
    <div className="mb-12 flex flex-wrap justify-center gap-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilter(filter.id)}
          className={`px-6 py-2 border rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === filter.id
              ? 'bg-primary-950 text-primary-50 border-primary-950'
              : 'border-primary-300 hover:border-primary-950 hover:bg-primary-50'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}






