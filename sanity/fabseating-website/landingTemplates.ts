const categories = [
  {slug: 'sofas', title: 'Sofas'},
  {slug: 'office-furniture', title: 'Office Furniture'},
  {slug: 'beds-mattresses', title: 'Beds & Mattresses'},
  {slug: 'wardrobes', title: 'Wardrobes'},
  {slug: 'dining-furniture', title: 'Dining Furniture'},
  {slug: 'chairs-recliners', title: 'Chairs & Recliners'},
  {slug: 'tv-consoles', title: 'TV Consoles'},
  {slug: 'storage-solutions', title: 'Storage Solutions'},
  {slug: 'modular-kitchens', title: 'Modular Kitchens'},
  {slug: 'curtains-blinds', title: 'Curtains & Blinds'},
  {slug: 'wallpapers', title: 'Wallpapers'},
  {slug: 'carpets-rugs', title: 'Carpets & Rugs'},
  {slug: 'doors', title: 'Doors'},
]

export const exploreCategories = categories

export const landingTemplates = categories.map((category) => ({
  id: `landing-${category.slug}`,
  title: `${category.title} landing page`,
  schemaType: 'categoryLanding',
  value: {
    label: category.title,
    slug: {_type: 'slug', current: category.slug},
  },
}))
