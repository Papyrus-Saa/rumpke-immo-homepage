interface Props {
  params: {
    id: string;
  }
}

export default async function EditAgentPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <h1>Edit Agent {id}</h1>
    </div>
  );
}
