import { cacheLife } from "next/cache";
import { YnsLink } from "@/components/yns-link";
import { commerce, meGetCached } from "@/lib/commerce";

async function FooterBlogLink() {
	"use cache";
	cacheLife("hours");

	const me = await meGetCached().catch(() => null);
	if (!me?.store.settings?.enabledTools?.blog) {
		return null;
	}

	return (
		<li>
			<YnsLink
				prefetch={"eager"}
				href="/blog"
				className="font-display text-xl text-cream hover:text-gold transition-colors"
			>
				Blog
			</YnsLink>
		</li>
	);
}

async function FooterContactLink() {
	"use cache";
	cacheLife("hours");

	const me = await meGetCached().catch(() => null);
	if (!me?.store.settings?.enabledTools?.contactForm) {
		return null;
	}

	return (
		<li>
			<YnsLink
				prefetch={"eager"}
				href="/contact"
				className="font-display text-xl text-cream hover:text-gold transition-colors"
			>
				Kontaktujte nás
			</YnsLink>
		</li>
	);
}

async function FooterCollections() {
	"use cache";
	cacheLife("hours");

	const collections = await commerce.collectionBrowse({ limit: 5 });

	if (collections.data.length === 0) {
		return null;
	}

	return (
		<div>
			<h3 className="font-condensed text-base tracking-[0.18em] text-gold">Obchod</h3>
			<ul className="mt-5 space-y-3">
				{collections.data.map((collection) => (
					<li key={collection.id}>
						<YnsLink
							prefetch={"eager"}
							href={`/collection/${collection.slug}`}
							className="font-display text-xl text-cream hover:text-gold transition-colors"
						>
							{collection.name}
						</YnsLink>
					</li>
				))}
			</ul>
		</div>
	);
}

async function FooterLegalPages() {
	"use cache";
	cacheLife("hours");

	const pages = await commerce.legalPageBrowse();

	if (pages.data.length === 0) {
		return null;
	}

	return (
		<div>
			<h3 className="font-condensed text-base tracking-[0.18em] text-gold">Právní</h3>
			<ul className="mt-5 space-y-3">
				{pages.data.map((page) => (
					<li key={page.id}>
						<YnsLink
							prefetch={"eager"}
							href={`/legal${page.href}`}
							className="font-display text-xl text-cream hover:text-gold transition-colors"
						>
							{page.label}
						</YnsLink>
					</li>
				))}
			</ul>
		</div>
	);
}

export function Footer() {
	return (
		<footer className="relative bg-soot text-cream overflow-hidden">
			<div aria-hidden className="absolute inset-0 bg-soot-gradient opacity-90" />
			<div
				aria-hidden
				className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-ember/20 blur-3xl pointer-events-none"
			/>

			<div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
				{/* Top giant wordmark */}
				<div className="pt-16 pb-10 border-b border-cream/10">
					<YnsLink
						prefetch={"eager"}
						href="/"
						className="block font-condensed text-[14vw] sm:text-[12vw] lg:text-[10vw] leading-none tracking-[-0.01em] text-cream/95 hover:text-gold transition-colors"
					>
						SYTON
					</YnsLink>
				</div>

				<div className="py-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
					<div className="col-span-2">
						<h3 className="font-condensed text-base tracking-[0.18em] text-gold">Syton</h3>
						<p className="mt-5 text-cream/75 leading-relaxed max-w-sm">
							Litinové nádobí pro kuchyni, gril i otevřený oheň. Masivní, poctivé, na celý život.
						</p>
					</div>

					<FooterCollections />

					<div>
						<h3 className="font-condensed text-base tracking-[0.18em] text-gold">Nápověda</h3>
						<ul className="mt-5 space-y-3">
							<li>
								<YnsLink
									prefetch={"eager"}
									href="/about"
									className="font-display text-xl text-cream hover:text-gold transition-colors"
								>
									O nás
								</YnsLink>
							</li>
							<FooterContactLink />
							<li>
								<YnsLink
									prefetch={"eager"}
									href="/faq"
									className="font-display text-xl text-cream hover:text-gold transition-colors"
								>
									FAQ
								</YnsLink>
							</li>
							<FooterBlogLink />
							<li>
								<a
									href="/#contact"
									className="font-display text-xl text-cream hover:text-gold transition-colors"
								>
									Kontakt
								</a>
							</li>
						</ul>
					</div>

					<FooterLegalPages />
				</div>

				<div className="py-6 border-t border-cream/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
					<p className="font-condensed text-[10px] tracking-[0.28em] text-cream/55">
						© {new Date().getFullYear()} Syton · Poctivá litina.
					</p>
				</div>
			</div>
		</footer>
	);
}
