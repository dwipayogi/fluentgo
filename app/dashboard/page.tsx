
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <div className="h-screen p-4">
      <h1 className="text-2xl font-extrabold">Dashboard</h1>
      <div>
        <p>hello {user?.username}</p>
        {user?.emailAddresses.map((email) => (
          <div key={email.id}>
            <p>{email.emailAddress}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
