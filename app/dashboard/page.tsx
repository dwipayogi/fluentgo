import { getSession } from "@auth0/nextjs-auth0";
import SectionCards from "@/components/dashboard/section-card";

export default async function Dashboard() {
  const session = await getSession();
  const user = session?.user;

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Continue your language learning journey
        </p>
      </div>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
      </div>
    </div>
  );
}
