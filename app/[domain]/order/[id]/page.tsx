import { notFound } from "next/navigation";
import Order from "@/components/public/products/order";
import db from "@/lib/db";
import { useParams, useRouter } from "next/navigation";
import { getSiteData } from "@/lib/fetchers";
export default async function ProductPage({
  params,
}: {
  params: { id: string, domain: string };
}) {
  // Fetch product details based on the ID
  const product = await db.query.product.findFirst({
    where: (product, { eq }) => eq(product.id, decodeURIComponent(params.id)),
  });

  const domain = decodeURIComponent(params.domain);
  const site = await getSiteData(domain);
  // Fetch categories for selection
  const categories = await db.query.category.findMany();
  // Handle case when the product is not found
  if (!product) {
    notFound(); // Render a 404 page if product is missing
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 mx-auto">
      <Order product={product} siteId={site.id} />
    </div>
  );
}
