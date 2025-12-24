import EditClient from './EditClient';

export async function generateStaticParams() {
  try {
    const res = await fetch('http://localhost:5000/api/events');
    const events = await res.json();
    return events.map((event: { id: number }) => ({
      id: event.id.toString(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function Page() {
  return <EditClient />;
}