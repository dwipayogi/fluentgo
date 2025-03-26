import { getSession } from "@auth0/nextjs-auth0";

export default async function Dashboard() {
  const session = await getSession();
  const user = session?.user;
  
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Continue your language learning journey
        </p>
      </div>
    </div>
  );
}
