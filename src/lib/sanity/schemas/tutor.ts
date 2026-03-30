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
    defineField({
      name: 'locations',
      title: '上課地點',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '線上', value: '線上' },
          { title: '台北', value: '台北' },
          { title: '新北', value: '新北' },
          { title: '桃園', value: '桃園' },
          { title: '新竹', value: '新竹' },
          { title: '台中', value: '台中' },
          { title: '台南', value: '台南' },
          { title: '高雄', value: '高雄' },
        ],
      },
      description: '最多選 3 個，可自行輸入不在列表中的地點',
      validation: (Rule) => Rule.max(3).warning('最多選 3 個地點'),
    }),
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
