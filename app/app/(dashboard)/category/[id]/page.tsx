import { ReactNode } from "react";
import Form from "@/components/form";
import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { updateCategory } from "@/lib/actions";
import db from "@/lib/db";

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await db.query.category.findFirst({
    where: (category, { eq }) => eq(category.id, decodeURIComponent(params.id)),
  });
  if (!data) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <Form
          title="Category Name"
          description="Category Name."
          helpText="Please use 32 characters maximum."
          inputAttrs={{
            name: "category_name",
            type: "text",
            defaultValue: data.category_name!,
            placeholder: "My Category",
            maxLength: 32,
          }}
          handleSubmit={updateCategory}
        />
      </div>
    </div>
  );
}
