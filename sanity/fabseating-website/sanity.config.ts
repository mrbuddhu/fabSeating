import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {landingTemplates} from './landingTemplates'

export default defineConfig({
  name: 'default',
  title: 'Fabseating Website',

  projectId: 'n59kaaxb',
  dataset: 'production',

  // The published view was locking fields, including the round photos.
  releases: {enabled: false},

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (previous) => [...previous, ...landingTemplates],
  },
})
