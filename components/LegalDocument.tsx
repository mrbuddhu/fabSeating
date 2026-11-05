import Link from 'next/link'
import type { LegalBlock } from '@/lib/legalCopy'

export function LegalDocument({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <article className="mx-auto max-w-3xl text-primary-900">
      {blocks.map((block, index) => {
        if (block.kind === 'meta') {
          return (
            <p key={index} className="mb-6 text-sm font-medium tracking-wide text-primary-600">
              {block.text}
            </p>
          )
        }
        if (block.kind === 'h2') {
          return (
            <h2 key={index} className="mb-3 mt-10 font-serif text-2xl font-semibold text-primary-950 md:text-3xl">
              {block.text}
            </h2>
          )
        }
        if (block.kind === 'h3') {
          return (
            <h3 key={index} className="mb-2 mt-6 font-serif text-xl font-semibold text-primary-950">
              {block.text}
            </h3>
          )
        }
        if (block.kind === 'h4') {
          return (
            <h4 key={index} className="mb-1 mt-4 text-base font-semibold text-primary-950">
              {block.text}
            </h4>
          )
        }
        if (block.kind === 'policies-link') {
          const [before, after] = block.text.split('Policies page')
          return (
            <p key={index} className="mb-3 text-base leading-relaxed text-primary-800">
              {before}
              <Link href="/policies" className="font-semibold text-primary-800 underline underline-offset-4">
                Policies page
              </Link>
              {after}
            </p>
          )
        }
        return (
          <p key={index} className="mb-3 text-base leading-relaxed text-primary-800">
            {block.text}
          </p>
        )
      })}
    </article>
  )
}
