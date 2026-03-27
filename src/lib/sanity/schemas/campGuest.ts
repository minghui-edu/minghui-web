import { defineType, defineField } from 'sanity';

export const campGuestSchema = defineType({
  name: 'campGuest',
  title: '誰來營隊',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: '照片（橫式）',
      type: 'image',
      options: { hotspot: true },
      description: '建議橫式寬景照，比例約 16:9 或 3:2',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: '職稱',
      type: 'string',
      description: '例如：台灣大學電機系教授',
      validation: (Rule) => Rule.required(),
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
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
});
