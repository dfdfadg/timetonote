import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * next/link with prefetching off by default. Prefetching every link that
 * scrolls into view (category grids, related guides, nav) multiplied ISR
 * reads, CDN requests and origin transfer on Vercel for little benefit on a
 * static site. Pass `prefetch` explicitly to opt back in for a link.
 */
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />;
}
