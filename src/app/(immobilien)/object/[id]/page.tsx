import { notFound } from "next/navigation";


interface Props {
  params: {
    id: string;
  }
}


export default async function Page({ params }: Props) {
  const { id } = await params;


  if (id === 'luxus') {
    notFound()
  }

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}
