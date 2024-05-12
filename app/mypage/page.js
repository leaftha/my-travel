export default async function Home() {
  let session = await getServerSession(authOptions);

  return (
    <div>
      <h1>df</h1>
    </div>
  );
}
