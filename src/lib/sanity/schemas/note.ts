import { defineField, defineType } from 'sanity';

export const noteSchema = defineType({
  name: 'note',
  title: '筆記商品',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: '商品名稱',     type: 'string',  validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug',        title: 'URL 代稱',     type: 'slug',    options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'cover',       title: '封面圖片',     type: 'image',   options: { hotspot: true } }),
    defineField({ name: 'subject',     title: '科目',         type: 'string' }),
    defineField({ name: 'level',       title: '難度／學級',   type: 'string' }),
    defineField({ name: 'author',      title: '作者',         type: 'string' }),
    defineField({ name: 'pages',       title: '頁數',         type: 'number' }),
    defineField({ name: 'price',       title: '售價（NT$）',  type: 'number' }),
    defineField({ name: 'description', title: '商品說明',     type: 'text' }),
    defineField({
      name: 'contents',
      title: '內容目錄',
      type: 'array',
      of: [{ type: 'string' }],
      description: '每行一個章節，例如：力學：牛頓定律、動量守恆',
    }),
    defineField({
      name: 'includes',
      title: '購買包含',
      type: 'array',
      of: [{ type: 'string' }],
      description: '每行一項，例如：PDF 筆記全文（68 頁）',
    }),
    defineField({
      name: 'tags',
      title: '標籤',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'purchaseUrl',  title: '購買連結（綠界等）', type: 'url' }),
    defineField({ name: 'isAvailable', title: '上架中',       type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'price', media: 'cover' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `NT$ ${subtitle}` : '未定價', media };
    },
  },
});
