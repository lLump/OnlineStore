import { FlameIcon, TreePineIcon, TentTreeIcon, CookingPotIcon } from "lucide-react";
import Image from "next/image";
import { YnsLink } from "../yns-link";

const bannerFeatures = [
	{ icon: FlameIcon, text: "Na otevřený oheň i na vařič" },
	{ icon: CookingPotIcon, text: "Více velikostí od 6 do 20 litrů" },
	{ icon: TentTreeIcon, text: "Trojnožky a příslušenství" },
	{ icon: TreePineIcon, text: "Ideální pro kempování a zahradu" },
];

export function RecipeFeature() {
	return (
		<section className="relative overflow-hidden bg-soot text-cream">
			{/* Background banner photo */}
			<Image
				src="https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/playground/01a10867-1e86-7768-aacd-b4a2cbfcf72e/test/01a11340-ac00-70bc-81be-27c68e040093-1791324376251.jpeg"
				alt="Litinový kotlík Syton nad ohněm v lese"
				fill
				sizes="100vw"
				className="object-cover"
			/>

			{/* Darkening: full-height feathered bands behind each text column */}
			<div
				aria-hidden
				className="absolute inset-y-0 left-0 w-full sm:w-[55%] bg-gradient-to-r from-soot/95 via-soot/70 to-transparent"
			/>
			<div
				aria-hidden
				className="absolute inset-y-0 right-0 w-full sm:w-[42%] bg-gradient-to-l from-soot/85 via-soot/55 to-transparent"
			/>

			<div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
				{/* Left: copy — darkening only around the text, feathered out */}
				<div className="relative max-w-xl">
					<div className="relative">
						<span className="text-sm font-normal tracking-[0.32em] text-gold-soft">
							KOTLÍKY SYTON
						</span>
						<h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl text-cream leading-[1.04]">
							Pro vaření v přírodě
						</h2>
						<p className="mt-6 text-cream/85 leading-relaxed">
							Ideální na guláš, polévky i dušená jídla. Včetně trojnožek a
							příslušenství.
						</p>
						<div className="mt-8">
							<YnsLink
								prefetch={"eager"}
								href="/category/kotliky"
								className="group inline-flex items-center gap-2 h-12 px-7 bg-gold text-cream rounded-sm font-normal tracking-[0.16em] text-sm hover:bg-gold-soft hover:text-soot transition-colors"
							>
								ZOBRAZIT KOTLÍKY
								<span aria-hidden className="inline-flex items-center text-xl leading-none group-hover:translate-x-0.5 transition-transform">
									→
								</span>
							</YnsLink>
						</div>
					</div>
				</div>

				{/* Right: benefits list — feathered darkening behind the text */}
				<div className="relative max-w-md lg:justify-self-end self-center">
					<ul className="relative space-y-5">
						{bannerFeatures.map(({ icon: Icon, text }) => (
							<li key={text} className="flex items-start gap-3 text-sm sm:text-base text-cream/90">
								<Icon className="h-7 w-7 shrink-0 text-gold-soft mt-1" aria-hidden />
								{text}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}