import { defineField, defineType } from 'sanity';

export const tutorSchema = defineType({
  name: 'tutor',
  title: '師資履歷',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: '姓名', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: '網址識別碼', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'title', title: '學歷/頭銜', type: 'string' }),
    defineField({ name: 'photo', title: '大頭照', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', title: '專長標籤', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'shortExp', title: '簡短經歷（列表顯示用）', type: 'string' }),
    defineField({ name: 'intro', title: '簡介與教學方式', type: 'text' }),
    defineField({ name: 'exp', title: '經歷與教學成果', type: 'text' }),
    defineField({ name: 'philosophy', title: '特色與教學理念', type: 'text' }),
    defineField({ name: 'isActive', title: '顯示於網站', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
});
