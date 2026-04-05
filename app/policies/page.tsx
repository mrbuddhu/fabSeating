import { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { generateSEOMetadata } from '@/components/SEOHead'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Privacy Policy',
  description: 'How Fab Seating collects, uses, and protects your personal information.',
  path: '/policies',
})

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How we handle your information when you use our website and services"
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
                1. Introduction
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                Fab Seating (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your privacy. This policy
                explains what information we may collect when you visit{' '}
                <span className="whitespace-nowrap">fabseating.com</span> or contact us, and how we use it. By using our
                site or services, you agree to this policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                2. Information we collect
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg leading-relaxed">
                <li>
                  <strong className="text-primary-950">Contact details</strong> you provide (name, email, phone number,
                  address, project details) when you submit enquiry forms, email us, or message us.
                </li>
                <li>
                  <strong className="text-primary-950">Technical data</strong> such as browser type, device type, rough
                  location (region), pages viewed, and referring URLs, collected through standard server logs and
                  analytics tools where enabled.
                </li>
                <li>
                  <strong className="text-primary-950">Cookies</strong> and similar technologies that help the site
                  function and, where you consent, measure traffic and marketing performance.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                3. How we use your information
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg leading-relaxed">
                <li>To respond to enquiries, provide quotes, and deliver our furniture and furnishing services.</li>
                <li>To improve our website, content, and customer experience.</li>
                <li>To comply with legal obligations and protect our legitimate business interests.</li>
                <li>
                  For marketing only where permitted by law and, where required, with your consent. You may opt out of
                  non-essential communications at any time.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                4. Sharing and retention
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                We do not sell your personal data. We may share information with trusted service providers (for example
                hosting, email delivery, or analytics) who process it only on our instructions and under appropriate
                safeguards. We retain data only as long as needed for the purposes above or as required by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                5. Security
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                We use reasonable technical and organisational measures to protect your information. No method of
                transmission over the internet is completely secure; we encourage you not to send sensitive payment
                card details through unsecured channels unless we explicitly request them through a secure process.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                6. Your rights
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                Depending on applicable law (including Indian data protection requirements as they evolve), you may have
                the right to access, correct, or delete certain personal data, or to object to or restrict some
                processing. To exercise these rights, contact us using the details below.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                7. Third-party links
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                Our site may link to third-party websites or social platforms. Their privacy practices are governed by
                their own policies; we are not responsible for their content or handling of data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                8. Changes
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top will change
                when we do. Continued use of the site after changes constitutes acceptance of the revised policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary-950 tracking-tight">
                9. Contact
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                Questions about this policy:{' '}
                <a
                  href="mailto:info@fabseating.com"
                  className="font-medium text-primary-600 hover:text-primary-800 underline underline-offset-2"
                >
                  info@fabseating.com
                </a>
                {' · '}
                <a href="tel:+919841066135" className="font-medium text-primary-600 hover:text-primary-800 underline underline-offset-2">
                  +91 98410 66135
                </a>
                {' · '}
                <Link href="/contact" className="font-medium text-primary-600 hover:text-primary-800 underline underline-offset-2">
                  Contact form
                </Link>
              </p>
            </section>

            <p className="pt-4 text-base text-primary-700">
              See also{' '}
              <Link href="/legals" className="font-semibold text-primary-600 hover:text-primary-800 underline underline-offset-2">
                Legal &amp; terms
              </Link>
              .
            </p>
          </div>
        </article>
      </Section>
    </>
  )
}
