'use client'

import { createContext, useContext } from 'react'
import { CONTACT, LABELS, type SiteContact, type SiteLabels } from '@/lib/siteContent'

const SiteContactContext = createContext<SiteContact>(CONTACT)
const SiteLabelsContext = createContext<SiteLabels>(LABELS)

export function SiteContactProvider({ value, labels = LABELS, children }: { value: SiteContact; labels?: SiteLabels; children: React.ReactNode }) {
  return (
    <SiteContactContext.Provider value={value}>
      <SiteLabelsContext.Provider value={labels}>{children}</SiteLabelsContext.Provider>
    </SiteContactContext.Provider>
  )
}

export function useSiteContact() {
  return useContext(SiteContactContext)
}

export function useSiteLabels() {
  return useContext(SiteLabelsContext)
}
