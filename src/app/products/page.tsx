import { fetchProducts, fetchProductsBySearch } from "@/utils/api";
import ProductCard from "@/components/ProductCard";
import SearchSort from "@/components/SearchSort";
import Pagination from "@/components/Pagination";
import { Product } from "@/types";
import { SearchParams } from "next/dist/server/request/search-params";

interface ProductsPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ITEMS_PER_PAGE = 8;

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  // Tunggu searchParams jika perlu
  const params = await searchParams;

  const search = typeof params.search === "string" ? params.search : "";
  const sort = typeof params.sort === "string" ? params.sort : "";
  const page = typeof params.page === "string" ? params.page : "1";

  const searchQuery = search;
  const sortBy = sort;
  const currentPage = Number(page) || 1;

  // Fetch products
  let productsData;
  if (searchQuery) {
    productsData = await fetchProductsBySearch(searchQuery);
  } else {
    productsData = await fetchProducts();
  }

  let products = productsData.products || [];

  // Apply sorting
  if (sortBy) {
    products = [...products].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating-asc") return a.rating - b.rating;
      if (sortBy === "rating-desc") return b.rating - a.rating;
      return 0;
    });
  }

  // Pagination
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="pr-5 text-3xl font-bold text-gray-800">Products</h1>
        <SearchSort />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}
