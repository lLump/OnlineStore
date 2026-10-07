import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { CookingPot, Flame, Gem, Leaf, Microwave } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductFilters, ProductFiltersMobile } from "@/components/sections/product-filters";
import { commerce } from "@/lib/commerce";
import { ProductsPagination } from "./products-pagination";
import { SortLinks, SortSelect } from "./products-sort-select";

const PRODUCTS_PER_PAGE = 12;

const sortOptions = [
	{ value: "newest", label: "Nejnovější", orderBy: "createdAt", orderDirection: "desc" },
	{ value: "price-asc", label: "Cena: od nejnižší", orderBy: "price", orderDirection: "asc" },
	{ value: "price-desc", label: "Cena: od nejvyšší", orderBy: "price", orderDirection: "desc" },
	{ value: "name", label: "Název: A–Z", orderBy: "name", orderDirection: "asc" },
] as const;

type ProductFilterParams = {
	page?: string;
	sort?: string;
	category?: string;
	collection?: string;
	brand?: string;
	priceMin?: string;
	priceMax?: string;
	vts?: string;
};

async function getFilterFacets() {
	"use cache";
	cacheLife("minutes");
	return commerce.productFilters();
}

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
	const { page } = await searchParams;
	const pageNum = Math.max(1, Number(page) || 1);
	const canonical = pageNum > 1 ? `/products?page=${pageNum}` : "/products";
	const title = pageNum > 1 ? `Všechny produkty — strana ${pageNum}` : "Všechny produkty";

	return {
		title,
		description: "Prohlédněte si naši kompletní nabídku.",
		alternates: { canonical },
		openGraph: {
			type: "website",
			title,
			description: "Prohlédněte si naši kompletní nabídku.",
			url: canonical,
		},
	};
}

async function ProductList({ filters }: { filters: ProductFilterParams }) {
	"use cache";
	cacheLife("minutes");

	const currentPage = Math.max(1, Number(filters.page) || 1);
	const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;
	const sortOption = sortOptions.find((s) => s.value === filters.sort) ?? sortOptions[0];

	const result = await commerce.productBrowse({
		active: true,
		limit: PRODUCTS_PER_PAGE,
		offset,
		orderBy: sortOption.orderBy,
		orderDirection: sortOption.orderDirection,
		category: filters.category,
		collection: filters.collection,
		brand: filters.brand,
		priceMin: filters.priceMin ? Number(filters.priceMin) : undefined,
		priceMax: filters.priceMax ? Number(filters.priceMax) : undefined,
		vts: filters.vts,
	});

	const totalPages = Math.ceil(result.meta.count / PRODUCTS_PER_PAGE);

	if (result.data.length === 0) {
		return (
			<div className="py-24 text-center">
				<p className="text-lg text-muted-foreground">Žádné produkty neodpovídají těmto filtrům.</p>
			</div>
		);
	}

	const countLabel =
		result.meta.count === 1 ? "produkt" : result.meta.count >= 2 && result.meta.count <= 4 ? "produkty" : "produktů";

	return (
		<>
			<p className="mb-6 text-sm text-muted-foreground">{result.meta.count} {countLabel}</p>
			<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
				{result.data.map((product, index) => (
					<ProductCard key={product.id} product={product} priority={index === 0} />
				))}
			</div>

			<ProductsPagination currentPage={currentPage} totalPages={totalPages} filters={filters} />
		</>
	);
}

function ProductGridSkeleton() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={`skeleton-${i}`}>
					<div className="aspect-square bg-secondary rounded-2xl mb-4 animate-pulse" />
					<div className="space-y-2">
						<div className="h-5 w-3/4 bg-secondary rounded animate-pulse" />
						<div className="h-5 w-1/4 bg-secondary rounded animate-pulse" />
					</div>
				</div>
			))}
		</div>
	);
}

// Awaits `searchParams` (runtime data) inside a Suspense boundary so the page shell
// stays prerenderable; `ProductList` remains cached, keyed on the resolved filters.
async function ProductSection({ searchParams }: { searchParams: Promise<ProductFilterParams> }) {
	const filters = await searchParams;
	return <ProductList filters={filters} />;
}

async function CategoryHeroTitle({ searchParams }: { searchParams: Promise<ProductFilterParams> }) {
	const { category } = await searchParams;
	let title = "Všechny produkty";
	let crumbs: { label: string; href?: string }[] = [{ label: "Domů", href: "/" }, { label: "Katalog" }];
	if (category) {
		const cat = await commerce.categoryGet({ idOrSlug: category });
		if (cat?.active) {
			title = cat.name;
			crumbs = [{ label: "Domů", href: "/" }, { label: "Katalog", href: "/products" }, { label: cat.name }];
		}
	}
	return (
		<div>
			<nav aria-label="breadcrumb" className="text-xs text-cream/80">
				{crumbs.map((crumb, index) => (
					<span key={crumb.label}>
						{index > 0 && <span className="mx-1.5">›</span>}
						{crumb.href ? (
							<a href={crumb.href} className="hover:text-cream transition-colors">{crumb.label}</a>
						) : (
							crumb.label
						)}
					</span>
				))}
			</nav>
			<h1 className="mt-3 text-4xl sm:text-5xl font-medium tracking-tight text-white heading-shadow">
				{title}
			</h1>
		</div>
	);
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<ProductFilterParams> }) {
	// `facets` is cached and independent of `searchParams`, so it can drive the layout
	// shell without making the route blocking. Runtime `searchParams` is read inside the
	// Suspense boundary below (see `ProductSection`).
	const facets = await getFilterFacets();
	const filtersAvailable =
		facets.categories.length > 0 ||
		facets.collections.length > 0 ||
		facets.brands.length > 0 ||
		facets.variantTypes.length > 0 ||
		facets.priceBounds.max > 0;

	const totalCount = (await commerce.productBrowse({ active: true, limit: 1 })).meta.count;

	return (
		<div className="pb-16">
			{/* Full-bleed catalog hero */}
			<section className="relative flex items-center overflow-hidden bg-soot text-cream min-h-[300px] sm:min-h-[360px]">
				<Image
					src="https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/playground/01a10867-1e86-7768-aacd-b4a2cbfcf72e/test/01a113ab-ca23-719d-9752-bd9c3f7281b8-1791331397239.jpeg"
					alt="Litinový hrnec Syton se směsí na dřevěném stole"
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>
				<div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-soot/75 via-soot/30 to-transparent" />
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
					<Suspense fallback={
						<div>
							<nav aria-label="breadcrumb" className="text-xs text-cream/80">
								<a href="/" className="hover:text-cream transition-colors">Domů</a>
								<span className="mx-1.5">›</span>
								<span>Katalog</span>
							</nav>
							<h1 className="mt-3 text-4xl sm:text-5xl font-medium tracking-tight text-white heading-shadow">
								Všechny produkty
							</h1>
						</div>
					}>
						<CategoryHeroTitle searchParams={searchParams} />
					</Suspense>
					<p className="mt-3 max-w-xl text-cream/90 leading-relaxed">
						<span className="block">Masivní litinové nádobí pro každý způsob vaření.</span>
						<span className="block">Vhodné na sporák, do trouby, na gril i otevřený oheň.</span>
					</p>
				</div>
			</section>

			{/* Feature band — continuation of the hero */}
			<div className="bg-[#f8f7f4] border-b border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
					{[
						{ icon: CookingPot, text: "Rovnoměrné rozložení tepla" },
						{ icon: Flame, text: "Na všechny typy sporáků i oheň" },
						{ icon: Microwave, text: "Vhodné do trouby" },
						{ icon: Gem, text: "Dlouhá životnost" },
						{ icon: Leaf, text: "Přírodní materiál bez chemického povrchu" },
					].map(({ icon: Icon, text }) => (
						<div key={text} className="flex items-center gap-3 text-xs text-foreground">
							<Icon aria-hidden className="h-8 w-8 shrink-0" strokeWidth={1.5} />
							<span>{text}</span>
						</div>
					))}
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
			<div className={filtersAvailable ? "lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10" : ""}>
				{filtersAvailable && <ProductFilters facets={facets} />}

				<div>
					{/* Mobile/tablet toolbar: Filters button + compact Sort dropdown (sidebar is hidden below lg). */}
					<div className="mb-8 flex items-center justify-between gap-3 lg:hidden">
						{filtersAvailable ? <ProductFiltersMobile facets={facets} /> : <span />}
						<SortSelect options={sortOptions} />
					</div>

					{/* Desktop toolbar: inline sort links (filters live in the sidebar). */}
					<div className="mb-8 hidden flex-wrap items-center gap-3 lg:flex">
						<span className="text-sm text-muted-foreground">Řazení:</span>
						<SortLinks options={sortOptions} />
					</div>

					<Suspense fallback={<ProductGridSkeleton />}>
						<ProductSection searchParams={searchParams} />
					</Suspense>
				</div>
			</div>
			</div>
		</div>
	);
}
