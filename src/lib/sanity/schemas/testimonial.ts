import { defineType, defineField } from 'sanity';

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: '學員評價',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: '評價內容',
      type: 'text',
      rows: 4,
      description: '留言或評價文字（Google 可索引此欄位，請務必填寫）',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: '姓名 / 暱稱',
      type: 'string',
      description: '例如：王同學、@youtube_user123',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'context',
      title: '身份說明',
      type: 'string',
      description: '例如：台大電機系 · 探索營學員 或 YouTube 留言',
    }),
    defineField({
      name: 'year',
      title: '年份',
      type: 'string',
      description: '例如：2024',
    }),
    defineField({
      name: 'screenshot',
      title: '截圖（選填）',
      type: 'image',
      description: '上傳 YouTube 留言截圖，會顯示在評價旁邊',
      options: { hotspot: true },
    }),
    defineField({
      name: 'source',
      title: '來源',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube 留言', value: 'youtube' },
          { title: '學員回饋', value: 'student' },
          { title: '家長回饋', value: 'parent' },
          { title: '其他', value: 'other' },
        ],
        layout: 'radio',
      },
      initialValue: 'student',
    }),
    defineField({
      name: 'order',
      title: '排列順序',
      type: 'number',
      description: '數字越小越靠前',
      initialValue: 99,
    }),
    defineField({
      name: 'featured',
      title: '首頁顯示',
      type: 'boolean',
      description: '勾選後會出現在首頁評價輪播',
      initialValue: true,
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
    select: { title: 'name', subtitle: 'quote', media: 'screenshot' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle?.slice(0, 60),
        media,
      };
    },
  },
});
