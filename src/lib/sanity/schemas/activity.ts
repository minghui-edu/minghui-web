import { defineField, defineType } from 'sanity';

export const activitySchema = defineType({
  name: 'activity',
  title: '活動梯次',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '活動名稱', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: '類別', type: 'string', options: { list: ['國內科系', '海外名校'] } }),
    defineField({ name: 'date', title: '活動日期', type: 'string' }),
    defineField({ name: 'tags', title: '標籤', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'description', title: '詳細說明', type: 'text' }),
    defineField({ name: 'image', title: '活動照片', type: 'image', options: { hotspot: true } }),
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
