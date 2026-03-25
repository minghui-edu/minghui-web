import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/lib/sanity/schemas';
import { sanityConfig } from './src/lib/sanity/config';

export default defineConfig({
  name: 'minghui-edu',
  title: '明慧教育 CMS',
  basePath: '/studio',
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [
    structureTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
