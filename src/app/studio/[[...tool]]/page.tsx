/**
 * Sanity Studio 後台管理頁面
 * 路徑: /studio
 * 注意: 此頁面不應對外公開，上線後需搭配身份驗證保護
 */
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
