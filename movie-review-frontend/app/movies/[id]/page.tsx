import EditFormLoader from "../../components/v1/EditFormLoader";

interface EditPageProps {
  params: Promise<{id: string}>;
}

export default async function EditMoviePage({ params }: EditPageProps) {
  const { id } = await params;
  return <EditFormLoader movieId={Number(id)}/>;
}