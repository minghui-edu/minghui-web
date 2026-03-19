import { defineField, defineType } from 'sanity';

export const noteSchema = defineType({
  name: 'note',
  title: '筆記商品',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '商品名稱', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'cover', title: '封面圖片', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'price', title: '售價（NT$）', type: 'number' }),
    defineField({ name: 'description', title: '商品說明', type: 'text' }),
    defineField({ name: 'purchaseUrl', title: '綠界付款連結', type: 'url' }),
    defineField({ name: 'isAvailable', title: '上架中', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'price', media: 'cover' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `NT$ ${subtitle}` : '未定價', media };
    },
  },
});
