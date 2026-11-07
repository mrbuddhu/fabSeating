import type {StructureResolver} from 'sanity/structure'
import {exploreCategories} from './landingTemplates'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Fab Seating')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.documentTypeList('siteSettings').title('Site Settings')),
      S.listItem()
        .title('Home')
        .id('home')
        .child(S.document().schemaType('homePage').documentId('homePage').title('Home')),
      S.listItem()
        .title('Explore')
        .id('explore-categories')
        .child(S.document().schemaType('homePage').documentId('homePage').title('Explore')),
      S.listItem()
        .title('Landing pages')
        .id('landing-pages')
        .child(
          S.list()
            .title('Landing pages')
            .items(
              exploreCategories.map((category) =>
                S.listItem()
                  .title(category.title)
                  .id(`landing-${category.slug}`)
                  .child(
                    S.documentList()
                      .title(`${category.title} — images and text`)
                      .filter('_type == "categoryLanding" && slug.current == $slug')
                      .params({slug: category.slug})
                      .initialValueTemplates([S.initialValueTemplateItem(`landing-${category.slug}`)]),
                  ),
              ),
            ),
        ),
      S.documentTypeListItem('productCategory').title('Product Category'),
      S.documentTypeListItem('product').title('Product'),
      S.listItem()
        .title('Gallery')
        .id('gallery-page')
        .child(S.document().schemaType('galleryPage').documentId('galleryPage').title('Gallery')),
      S.listItem()
        .title('Catalogues')
        .child(S.documentTypeList('catalog').title('Catalogues')),
      S.listItem()
        .title('Contact')
        .child(S.documentTypeList('contactPage').title('Contact')),
      S.documentTypeListItem('teamMember').title('Team'),
      S.listItem()
        .title('Banner')
        .id('footer-banner')
        .child(S.document().schemaType('footerBanner').documentId('footerBanner').title('Banner')),
      S.listItem()
        .title('Blog')
        .child(S.documentTypeList('blogPost').title('Blog')),
      S.listItem()
        .title('Article Images')
        .child(S.documentTypeList('articleMedia').title('Article Images')),
      S.listItem()
        .title('Legals and Policies')
        .child(S.documentTypeList('legalDocument').title('Legals and Policies')),
      S.documentTypeListItem('caseStudy').title('Case Studies'),
      S.documentTypeListItem('author').title('Author'),
    ])
