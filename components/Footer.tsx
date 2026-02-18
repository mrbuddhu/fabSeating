import Link from 'next/link'
import Image from 'next/image'
import { Container } from './Container'

const footerLinks = {
  company: [
    { href: '/blog', label: 'Blog' },
    { href: '/legals', label: 'Legals' },
    { href: '/policies', label: 'Policies' },
  ],
  products: [
    { href: '/catalog', label: 'Catalog' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/projects', label: 'Projects' },
  ],
  support: [
    { href: '/contact', label: 'Contact' },
    { href: 'mailto:info@fabseating.com', label: 'info@fabseating.com' },
    { href: 'tel:+919841066135', label: '098410 66135' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="grainy-gradient text-primary-100 mt-4 mx-4 md:mx-6 lg:mx-8 mb-6 rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.18)] relative">
      <Container>
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image src="/logo.png" alt="Fab Seating logo" width={440} height={128} className="h-28 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" />
            </div>
            <p className="text-primary-200 text-base leading-relaxed mb-4">
              Premium furniture crafted with excellence and attention to detail.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/fabseating/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-900/40 text-primary-50 hover:bg-primary-50 hover:text-primary-900 transition-colors duration-200"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path
                    fill="currentColor"
                    d="M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3Zm0 7.7A3 3 0 1 1 15 12a3 3 0 0 1-3 3Zm4.9-7.9a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1Z"
                  />
                  <path
                    fill="currentColor"
                    d="M17.9 3.1H6.1A3 3 0 0 0 3.1 6.1v11.8a3 3 0 0 0 3 3h11.8a3 3 0 0 0 3-3V6.1a3 3 0 0 0-3-3Zm1.8 14.8a1.8 1.8 0 0 1-1.8 1.8H6.1a1.8 1.8 0 0 1-1.8-1.8V6.1a1.8 1.8 0 0 1 1.8-1.8h11.8a1.8 1.8 0 0 1 1.8 1.8Z"
                  />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@FabSeating"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-900/40 text-primary-50 hover:bg-primary-50 hover:text-primary-900 transition-colors duration-200"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path
                    fill="currentColor"
                    d="M21.8 8.001a2.75 2.75 0 0 0-1.93-1.94C18.25 5.5 12 5.5 12 5.5s-6.25 0-7.87.561A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 1.64 12a28.6 28.6 0 0 0 .56 3.999 2.75 2.75 0 0 0 1.93 1.94C5.75 18.5 12 18.5 12 18.5s6.25 0 7.87-.561a2.75 2.75 0 0 0 1.93-1.94A28.6 28.6 0 0 0 22.36 12a28.6 28.6 0 0 0-.56-3.999Z"
                  />
                  <path
                    fill="#0f172a"
                    d="M10 9.75v4.5L14.5 12Z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-base uppercase tracking-[0.12em] text-primary-50">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-primary-50 text-base transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-base uppercase tracking-[0.12em] text-primary-50">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-primary-50 text-base transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-base uppercase tracking-[0.12em] text-primary-50">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-primary-50 text-base transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 py-8 text-center text-sm text-primary-400">
          <p>&copy; {currentYear} Fab Seating. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

