import { defineField, defineType } from 'sanity';

export const activitySchema = defineType({
  name: 'activity',
  title: '活動梯次',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '活動名稱', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: '網址識別碼', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: '類別', type: 'string', options: { list: ['國內科系', '海外名校'] } }),
    defineField({ name: 'date', title: '活動日期', type: 'string' }),
    defineField({ name: 'duration', title: '活動時長（例：3天2夜）', type: 'string' }),
    defineField({ name: 'audience', title: '適合對象', type: 'string' }),
    defineField({ name: 'location', title: '地點', type: 'string' }),
    defineField({ name: 'price', title: '費用（NT$）', type: 'number' }),
    defineField({ name: 'maxParticipants', title: '名額', type: 'number' }),
    defineField({ name: 'tags', title: '標籤', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'description', title: '活動簡介', type: 'text' }),
    defineField({
      name: 'schedule',
      title: '課程大綱／行程規劃',
      type: 'array',
      of: [{ type: 'string' }],
      description: '每行一個項目，例如：Day 1 — 黑客松啟動、分組提案',
    }),
    defineField({
      name: 'includes',
      title: '費用包含',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'notes',
      title: '注意事項',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'image', title: '主視覺照片', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'registrationUrl', title: '報名連結', type: 'url' }),
    defineField({
      name: 'status',
      title: '狀態',
      type: 'string',
      options: { list: ['報名中', '即將開放', '已額滿', '已結束'] },
      initialValue: '報名中',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', status: 'status' },
    prepare({ title, subtitle, status }) {
      return { title, subtitle: `${subtitle} — ${status}` };
    },
  },
});
