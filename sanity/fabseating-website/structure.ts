import type {StructureResolver} from 'sanity/structure'
import {exploreCategories} from './landingTemplates'

const home = (S: Parameters<StructureResolver>[0]) =>
  S.document().schemaType('homePage').documentId('homePage').title('Home page')

const settings = (S: Parameters<StructureResolver>[0]) =>
  S.document().schemaType('siteSettings').documentId('siteSettings').title('Logo, phone and address')

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Fab Seating')
    .items([
      S.listItem()
        .title('Home page')
        .id('home')
        .child(home(S)),
      S.listItem()
        .title('Category pages')
        .id('category-pages')
        .child(
          S.list()
            .title('These open when a circle is clicked')
            .items(
              exploreCategories.map((category) =>
                S.listItem()
                  .title(category.title)
                  .id(`landing-${category.slug}`)
                  .child(
                    S.documentList()
                      .title(`${category.title} page`)
                      .filter('_type == "categoryLanding" && slug.current == $slug')
                      .params({slug: category.slug})
                      .initialValueTemplates([S.initialValueTemplateItem(`landing-${category.slug}`)]),
                  ),
              ),
            ),
        ),
      S.divider().title('Same order as the menu'),
      S.listItem()
        .title('Gallery')
        .id('gallery-page')
        .child(S.document().schemaType('galleryPage').documentId('galleryPage').title('Gallery')),
      S.listItem()
        .title('Catalogues')
        .id('catalogues')
        .child(S.documentTypeList('catalog').title('Catalogues')),
      S.listItem()
        .title('Contact')
        .id('contact')
        .child(S.document().schemaType('contactPage').documentId('contactPage').title('Contact')),
      S.divider().title('On every page'),
      S.listItem()
        .title('Banner above the footer')
        .id('footer-banner')
        .child(S.document().schemaType('footerBanner').documentId('footerBanner').title('Banner above the footer')),
      S.listItem()
        .title('Logo, phone and address')
        .id('site-settings')
        .child(settings(S)),
      S.divider().title('Also on the home page'),
      S.listItem()
        .title('Team')
        .id('team')
        .child(S.documentTypeList('teamMember').title('Team — under Custom solutions')),
      S.divider().title('Photos inside category pages'),
      S.listItem()
        .title('Products')
        .id('products')
        .child(S.documentTypeList('product').title('Products')),
      S.listItem()
        .title('Product folders')
        .id('product-folders')
        .child(
          S.documentTypeList('productCategory').title('Folders such as Sofas, Beds and Rugs'),
        ),
      S.divider().title('Other pages'),
      S.listItem()
        .title('Blog')
        .id('blog')
        .child(S.documentTypeList('blogPost').title('Blog')),
      S.listItem()
        .title('Article photos')
        .id('article-photos')
        .child(S.documentTypeList('articleMedia').title('Photos on journal articles')),
      S.listItem()
        .title('Authors')
        .id('authors')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Policies')
        .id('policies')
        .child(S.documentTypeList('legalDocument').title('Policies')),
      S.listItem()
        .title('Case studies')
        .id('case-studies')
        .child(S.documentTypeList('caseStudy').title('Case studies')),
    ])
