import Link from 'next/link';
import type { ComponentProps } from 'react';

type TrackProps = { event: string; location: string; name: string };

/** 轉成 data 屬性，由 ClickTracker 統一送出 GA4 事件 */
function trackAttrs({ event, location, name }: TrackProps) {
  return { 'data-track': event, 'data-cta-location': location, 'data-item-name': name };
}

/** 外部連結（<a target="_blank">）加 GA 追蹤 */
export function TrackedLink({
  href,
  ga,
  children,
  ...props
}: ComponentProps<'a'> & { href: string; ga: TrackProps }) {
  return (
    <a
      href={href}
      {...trackAttrs(ga)}
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
}: ComponentProps<typeof Link> & { ga: TrackProps }) {
  return (
    <Link
      href={href}
      {...trackAttrs(ga)}
      {...props}
    >
      {children}
    </Link>
  );
}
