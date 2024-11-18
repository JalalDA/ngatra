import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import CategoryCardRow from "./category-card-row";

export default async function Categories({ limit }: { limit?: number }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const categories = await db.query.category.findMany({
    orderBy: (category, { asc }) => asc(category.category_name),
    ...(limit ? { limit } : {}),
  });

  return categories.length > 0 ? (
    <div className="space-y-4">
      {categories.map((category) => (
        <CategoryCardRow key={category.id} data={category} />
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl text-white">No Categories Yet</h1>
      <p className="text-lg text-stone-500">
        You do not have any categories yet. Create one to get started.
      </p>
    </div>
  );
}
