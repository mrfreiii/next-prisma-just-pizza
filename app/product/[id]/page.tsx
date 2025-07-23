export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return <p>{`product id = ${id}`}</p>
}