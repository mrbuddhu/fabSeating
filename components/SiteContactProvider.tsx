'use client'

import { createContext, useContext } from 'react'
import { CONTACT, type SiteContact } from '@/lib/siteContent'

const SiteContactContext = createContext<SiteContact>(CONTACT)

export function SiteContactProvider({ value, children }: { value: SiteContact; children: React.ReactNode }) {
  return <SiteContactContext.Provider value={value}>{children}</SiteContactContext.Provider>
}

export function useSiteContact() {
  return useContext(SiteContactContext)
}
