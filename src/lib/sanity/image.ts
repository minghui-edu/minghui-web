import imageUrlBuilder from '@sanity/image-url';
import { sanityConfig } from './config';

const builder = imageUrlBuilder(sanityConfig);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
