import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/lib/sanity/schemas';
import { sanityConfig } from './src/lib/sanity/config';

export default defineConfig({
  name: 'minghui-edu',
  title: '明慧教育 CMS',
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('管理後台')
          .items([
            S.listItem().id('activity').title('活動梯次管理').schemaType('activity').child(S.documentTypeList('activity')),
            S.listItem().id('tutor').title('師資履歷管理').schemaType('tutor').child(S.documentTypeList('tutor')),
            S.listItem().id('note').title('筆記商品管理').schemaType('note').child(S.documentTypeList('note')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
