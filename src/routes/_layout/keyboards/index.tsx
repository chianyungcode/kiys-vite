import {
  createFileRoute,
  useLoaderData,
  // useLocation,
} from "@tanstack/react-router";

import { fetchCategory } from "@/api/categoryApi";
import ProductCatalog from "@/components/product-catalog";
import Container from "@/components/ui/container";
import SidebarFilter from "@/components/ui/sidebar-filter";
import { Category } from "@/types/category";

const KeyboardsPage = () => {
  const { category } = useLoaderData({ from: "/_layout/keyboards/" });
  const { data }: { data: Category } = category;

  // console.log("Data dari keyboard page", dataCategories);

  return (
    <Container className="flex gap-x-2">
      <SidebarFilter categoryTitle="Keyboards" />
      <ProductCatalog inCategoryPage={true} categories={[data]} />
    </Container>
  );
};

export const Route = createFileRoute("/_layout/keyboards/")({
  component: KeyboardsPage,
  loader: async () => {
    const category = await fetchCategory("keyboard");

    return { category };
  },
});
