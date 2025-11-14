interface Props {
  params: {
    id: string;
  }
}

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <h1>Edit Property {id}</h1>
    </div>
  );
}
