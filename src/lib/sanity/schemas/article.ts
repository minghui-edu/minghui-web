import { defineArrayMember, defineField, defineType } from 'sanity';

export const articleSchema = defineType({
  name: 'article',
  title: '升學文章',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '文章標題', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: '網址代稱',
      type: 'slug',
      description: '建議用英文小寫加連字號，例如 high-school-camp-guide',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '分類',
      type: 'string',
      options: {
        list: [
          { title: '海外升學', value: 'overseas' },
          { title: '科系探索', value: 'exploration' },
          { title: '家教選擇', value: 'tutor' },
          { title: '讀書方法', value: 'study' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: '作者',
      type: 'reference',
      to: [{ type: 'tutor' }],
      description: '從師資資料選擇，文章會顯示該老師的照片與學歷',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cover',
      title: '封面圖片',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: '圖片說明', type: 'string', description: '描述圖片內容，給搜尋引擎與視障讀者使用' })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: '本文重點',
      type: 'text',
      rows: 3,
      description: '用 2～3 句話直接回答讀者的問題，會顯示在文章開頭與列表',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      title: '內文',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: '內文', value: 'normal' },
            { title: '大標題', value: 'h2' },
            { title: '小標題', value: 'h3' },
            { title: '引言', value: 'blockquote' },
          ],
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: '圖片說明', type: 'string' }),
            defineField({ name: 'caption', title: '圖說', type: 'string' }),
          ],
        }),
        defineArrayMember({
          name: 'table',
          title: '表格',
          type: 'object',
          fields: [
            defineField({
              name: 'rows',
              title: '表格列',
              type: 'array',
              description: '第一列會當作表頭',
              of: [
                defineArrayMember({
                  name: 'row',
                  title: '列',
                  type: 'object',
                  fields: [defineField({ name: 'cells', title: '儲存格', type: 'array', of: [{ type: 'string' }] })],
                  preview: {
                    select: { cells: 'cells' },
                    prepare: ({ cells }) => ({ title: (cells ?? []).join('｜') }),
                  },
                }),
              ],
            }),
          ],
          preview: { prepare: () => ({ title: '表格' }) },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: '發布日期',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'updatedAt', title: '最後更新日期', type: 'datetime', description: '內容有更新時填寫' }),
    defineField({ name: 'seoTitle', title: '搜尋結果標題', type: 'string', description: '沒填就用文章標題', validation: (Rule) => Rule.max(60) }),
    defineField({ name: 'seoDescription', title: '搜尋結果描述', type: 'text', rows: 2, description: '沒填就用本文重點', validation: (Rule) => Rule.max(160) }),
  ],
  orderings: [{ title: '發布日期（新到舊）', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'cover' } },
});
