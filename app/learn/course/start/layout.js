// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default function StartLayout({ children }) {
  return children;
}
