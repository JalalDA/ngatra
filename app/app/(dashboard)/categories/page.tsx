import { Suspense } from "react";
import PlaceholderCard from "@/components/placeholder-card";
import CreateCategoryButton from "@/components/create-category-button";
import CreateCategoryModal from "@/components/page/categories/create-category";
import Categories from "@/components/page/categories/categories";

export default function CategoriesPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            All Product Categories
          </h1>
          <CreateCategoryButton>
            <CreateCategoryModal />
          </CreateCategoryButton>
        </div>
        <Suspense
          fallback={
            <div className="text-center text-white">Loading categories...</div>
          }
        >
          <Categories />
        </Suspense>
      </div>
    </div>
  );
}
