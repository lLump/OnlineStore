import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { YnsLink } from "@/components/yns-link";
import { meGetCached } from "@/lib/commerce";
import { JsonLdScript } from "@/lib/json-ld";

export const metadata: Metadata = {
	title: "O nás",
	description: "Poznejte náš příběh, naše hodnoty a lidi, kteří stojí za našimi produkty.",
	alternates: { canonical: "/about" },
	openGraph: {
		type: "website",
		title: "O nás",
		description: "Poznejte náš příběh, naše hodnoty a lidi, kteří stojí za našimi produkty.",
		url: "/about",
	},
};

async function getStoreInfo() {
	try {
		const me = await meGetCached();
		return {
			storeName: me.store.name || "our store",
			storeDescription: me.store.settings?.storeDescription || null,
			contactFormEnabled: me.store.settings?.enabledTools?.contactForm ?? false,
		};
	} catch {
		return { storeName: "our store", storeDescription: null, contactFormEnabled: false };
	}
}

export default async function AboutPage() {
	"use cache";
	cacheLife("hours");

	const { storeName, storeDescription, contactFormEnabled } = await getStoreInfo();

	const aboutJsonLd = {
		"@context": "https://schema.org",
		"@type": "AboutPage",
		name: `O ${storeName}`,
		description:
			storeDescription ?? "Poznejte náš příběh, naše hodnoty a lidi, kteří stojí za našimi produkty.",
	};

	return (
		<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
			<JsonLdScript data={aboutJsonLd} />

			{/* Header */}
			<div className="mb-10">
				<YnsLink
					prefetch="eager"
					href="/"
					className="text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					Domů
				</YnsLink>
				<span className="mx-2 text-muted-foreground">/</span>
				<span className="text-sm">O nás</span>
				<h1 className="mt-4 text-4xl font-medium tracking-tight">O nás</h1>
				{storeDescription && <p className="mt-3 text-lg text-muted-foreground">{storeDescription}</p>}
			</div>

			{/* Story */}
			<div className="space-y-12">
				<section>
					<h2 className="text-2xl font-medium tracking-tight mb-4">Náš příběh</h2>
					<div className="space-y-4 text-muted-foreground leading-relaxed">
						<p>
							Věříme v sílu promyšleného designu. Každý produkt v naší nabídce je pečlivě vybrán tak, aby
							přinesl kvalitu, krásu i funkčnost do vaší každodenní kuchyně.
						</p>
						<p>
							Úcta k řemeslu znamená, že spolupracujeme s výrobci, kteří sdílejí naše hodnoty — s těmi, kdo
							upřednostňují poctivé materiály, férovou výrobu a nadčasový design před krátkodobými trendy.
						</p>
					</div>
				</section>

				<section>
					<h2 className="text-2xl font-medium tracking-tight mb-4">Naše hodnoty</h2>
					<div className="grid gap-6 sm:grid-cols-3">
						<div>
							<h3 className="text-base font-medium text-foreground">Kvalita na prvním místě</h3>
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
								Odolné, poctivě zpracované produkty, za které rádi ručíme.
							</p>
						</div>
						<div>
							<h3 className="text-base font-medium text-foreground">Promyšlený design</h3>
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
								Promyšlené detaily, díky kterým jsou každodenní chvíle lepší.
							</p>
						</div>
						<div>
							<h3 className="text-base font-medium text-foreground">Poctivý servis</h3>
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
								Živí lidé, připravení pomoci před i po objednávce.
							</p>
						</div>
					</div>
				</section>
			</div>

			{/* CTA */}
			<div className="mt-16 rounded-lg border border-border bg-secondary/30 p-8 text-center">
				<h2 className="text-2xl font-medium tracking-tight">Chcete vědět víc?</h2>
				<p className="mt-2 text-muted-foreground">
					Prohlédněte si naše produkty nebo nám napište — rádi si s vámi povídáme.
				</p>
				<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
					<YnsLink
						prefetch="eager"
						href="/products"
						className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-all hover:bg-foreground/90"
					>
						Prohlédnout nádobí
					</YnsLink>
					{contactFormEnabled && (
						<YnsLink
							prefetch="eager"
							href="/contact"
							className="inline-flex h-11 items-center justify-center rounded-full border border-border px-8 font-medium text-foreground transition-colors hover:bg-secondary"
						>
							Napište nám
						</YnsLink>
					)}
				</div>
			</div>
		</div>
	);
}
