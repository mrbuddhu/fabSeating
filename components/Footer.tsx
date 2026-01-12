import Link from 'next/link'
import Image from 'next/image'
import { Container } from './Container'

const footerLinks = {
  company: [
    { href: '/legals', label: 'Legals' },
  ],
  products: [
    { href: '/projects', label: 'Projects' },
  ],
  support: [
    { href: '/contact', label: 'Contact' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="grainy-gradient text-primary-100 mt-32 mx-4 md:mx-6 lg:mx-8 mb-6 rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.18)] relative">
      <Container>
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image src="/logo.png" alt="Fab Seating logo" width={440} height={128} className="h-28 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" />
            </div>
            <p className="text-primary-200 text-base leading-relaxed">
              Premium furniture crafted with excellence and attention to detail.
            </p>
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

