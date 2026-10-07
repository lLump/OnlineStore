import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { YnsLink } from "@/components/yns-link";

export const metadata: Metadata = {
	title: "Recepty",
	description:
		"Recepty pro přípravu na litinových pánvích, kotlících a hrncích Syton – na plotně, v troubě i na ohni.",
	alternates: { canonical: "/recepty" },
	openGraph: {
		type: "website",
		title: "Recepty",
		description:
			"Recepty pro přípravu na litinových pánvích, kotlících a hrncích Syton – na plotně, v troubě i na ohni.",
		url: "/recepty",
	},
};

export default async function RecipesPage() {
	"use cache";
	cacheLife("hours");

	return (
		<section className="bg-[#f8f7f4]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 text-center">
				<h1 className="font-display text-4xl sm:text-5xl text-soot leading-[1.05]">
					Recepty
				</h1>
				<p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-base leading-relaxed">
					Brzy zde najdeme osvědčené recepty na pečení, dušení a grilování –
					vše připravené na litinovém nádobí Syton, na plotně, v troubě i nad
					otevřeným ohněm.
				</p>
				<div className="mt-10">
					<YnsLink
						href="/products"
						className="inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-soot text-cream text-sm font-medium transition-colors hover:bg-black"
					>
						Prohlédnout nádobí
					</YnsLink>
				</div>
			</div>
		</section>
	);
}