import OlayClient from './OlayClient';

export async function generateStaticParams() {
  try {
    const res = await fetch('http://localhost:5000/api/events');
    const events = await res.json();
    return events.map((event: { slug: string }) => ({
      slug: event.slug,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function Page() {
  return <OlayClient />;
}