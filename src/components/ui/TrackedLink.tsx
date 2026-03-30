'use client';

import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import type { ComponentProps } from 'react';

type GAParams = { category: string; label: string };

/** 外部連結（<a target="_blank">）加 GA 追蹤 */
export function TrackedLink({
  href,
  ga,
  children,
  ...props
}: ComponentProps<'a'> & { href: string; ga: GAParams }) {
  return (
    <a
      href={href}
      onClick={() => sendGAEvent('event', 'click', ga)}
      {...props}
    >
      {children}
    </a>
  );
}

/** 站內連結（Next.js Link）加 GA 追蹤 */
export function TrackedInternalLink({
  href,
  ga,
  children,
  ...props
}: ComponentProps<typeof Link> & { ga: GAParams }) {
  return (
    <Link
      href={href}
      onClick={() => sendGAEvent('event', 'click', ga)}
      {...props}
    >
      {children}
    </Link>
  );
}
