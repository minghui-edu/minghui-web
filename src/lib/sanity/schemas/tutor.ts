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
    defineField({
      name: 'tier',
      title: '師資等級',
      type: 'string',
      options: {
        list: [
          { title: 'A 級 — 至少 1 年教學經驗，時薪 900–1200', value: 'A' },
          { title: 'S 級 — 至少 5 年教學經驗，時薪 1200–1500', value: 'S' },
          { title: 'SS 級 — 自建教材 + 5000 小時以上，時薪 1500 起', value: 'SS' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'isActive', title: '顯示於網站', type: 'boolean', initialValue: true }),
    defineField({
      name: 'order',
      title: '排列順序',
      type: 'number',
      description: '數字越小越靠前（首頁顯示排序第 1–3 位的老師）',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tier', media: 'photo' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `${subtitle} 級` : '未設定等級' };
    },
  },
});
