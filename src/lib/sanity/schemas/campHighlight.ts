import { defineType, defineField } from 'sanity';

export const campHighlightSchema = defineType({
  name: 'campHighlight',
  title: '活動花絮照片',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: '照片',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: '說明文字（選填）',
      type: 'string',
      description: '例如：2024 台大電機科系探索營',
    }),
    defineField({
      name: 'order',
      title: '排列順序',
      type: 'number',
      description: '數字越小越靠前',
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: '排列順序',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'caption', media: 'photo' },
    prepare({ title, media }) {
      return { title: title ?? '活動花絮照片', media };
    },
  },
});
