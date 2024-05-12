import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  let session = await getServerSession(authOptions);
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("user_id")
    .findOne({ email: session.user.email });

  return (
    <div>
      <h1>{result.name}</h1>
      <h1>{result.email}</h1>

      <ul>
        {result.likes.map((id, idx) => (
          <li>
            <Link href={`/travelDetail/${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
