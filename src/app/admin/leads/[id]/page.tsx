interface Props {
  params: {
    id: string;
  }
}

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params;
  
  return (
    <div>
      <h1>Lead Detail {id}</h1>
    </div>
  );
}
