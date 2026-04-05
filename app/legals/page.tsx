import { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { generateSEOMetadata } from '@/components/SEOHead'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Legal & Terms',
  description: 'Terms of use, disclaimers, and legal information for Fab Seating.',
  path: '/legals',
})

export default function LegalsPage() {
  return (
    <>
      <PageHero
        title="Legal & Terms"
        subtitle="Terms of use and legal information for our website and services"
        className="pb-6 md:pb-8"
        titleClassName="mb-3 md:mb-4"
      />
      <Section className="pt-2 pb-12 md:pt-4 md:pb-16">
        <article className="max-w-3xl mx-auto px-0">
          <p className="text-sm text-primary-700 mb-8">
            Last updated: April 2026 · Fab Seating Furniture &amp; Furnishings
          </p>

          <div className="space-y-10 text-primary-800">
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                1. Website terms of use
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                By accessing <span className="whitespace-nowrap">fabseating.com</span> (&ldquo;Site&rdquo;), you agree to
                these terms. If you do not agree, please do not use the Site. We may change these terms at any time;
                continued use after changes means you accept the updated terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                2. Business information
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                Fab Seating provides custom furniture, furnishings, and related interior solutions. Project scope,
                timelines, pricing, and deliverables are agreed in writing (quotation, work order, or contract) between
                you and Fab Seating. Content on this Site is for general information only and does not replace a formal
                agreement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                3. Intellectual property
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                All text, images, logos, designs, and other materials on the Site are owned by Fab Seating or its
                licensors unless otherwise stated. You may not copy, modify, distribute, or use them for commercial
                purposes without our prior written permission, except as allowed by law for personal, non-commercial
                viewing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                4. Product imagery and descriptions
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                Photographs, renders, and catalog images are representative. Colours, textures, and finishes may vary
                due to screen settings, lighting, and natural material variation. Dimensions and specifications on the
                Site are indicative; confirmed details will be provided for your specific order.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                5. Limitation of liability
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                To the fullest extent permitted by applicable law, Fab Seating and its team shall not be liable for any
                indirect, incidental, special, or consequential loss arising from use of the Site or reliance on its
                content. Our total liability for any claim relating to the Site (where not excluded by law) shall not
                exceed the amount you paid us specifically for the matter in dispute in the twelve months before the
                claim, or INR 5,000, whichever is greater.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                6. Indemnity
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                You agree to indemnify and hold harmless Fab Seating from claims or damages arising from your misuse of
                the Site, violation of these terms, or infringement of third-party rights, except where caused by our
                gross negligence or wilful misconduct.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                7. Governing law
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                These terms are governed by the laws of India. Subject to mandatory consumer protections, courts in
                Chennai, Tamil Nadu, shall have exclusive jurisdiction over disputes arising from the Site or these
                terms, unless otherwise agreed in a separate contract.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                8. Contact
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                For legal or contractual questions:{' '}
                <a
                  href="mailto:info@fabseating.com"
                  className="font-medium text-primary-600 hover:text-primary-800 underline underline-offset-2"
                >
                  info@fabseating.com
                </a>
                {' · '}
                <Link href="/contact" className="font-medium text-primary-600 hover:text-primary-800 underline underline-offset-2">
                  Contact page
                </Link>
              </p>
            </section>

            <p className="pt-4 text-base text-primary-700">
              See also{' '}
              <Link href="/policies" className="font-semibold text-primary-600 hover:text-primary-800 underline underline-offset-2">
                Privacy policy
              </Link>
              .
            </p>
          </div>
        </article>
      </Section>
    </>
  )
}
