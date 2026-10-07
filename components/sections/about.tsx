import Image from "next/image";

export function About() {
	return (
		<section id="about" className="relative bg-soot text-cream overflow-hidden">
			<div aria-hidden className="absolute inset-0 bg-soot-gradient" />
			<div
				aria-hidden
				className="absolute inset-y-0 right-0 w-2/3 opacity-30 pointer-events-none flame-noise"
			/>

			<div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 sm:pt-14 pb-10 sm:pb-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
				<div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-sm overflow-hidden border border-flame/20 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
					<Image
						src="/scraped-3.jpg"
						alt="Чугунная сковорода Syton в ремесленной мастерской"
						fill
						sizes="(max-width: 1024px) 100vw, 600px"
						className="object-cover"
					/>
					<div
						aria-hidden
						className="absolute inset-0 bg-gradient-to-tr from-soot/70 via-transparent to-transparent"
					/>
					<div className="absolute bottom-6 left-6 right-6 font-condensed tracking-[0.22em] text-[11px] text-cream/80">
						Est. The Year Nonna Stopped Speaking To Us
					</div>
				</div>

				<div id="story">
					<h2 className="font-display text-5xl sm:text-6xl text-cream leading-[1.02]">
						Poctivá litina na celý život.
					</h2>
					<div className="mt-8 space-y-5 text-cream/80 text-base sm:text-lg leading-relaxed max-w-xl">
						<p>
							Syton — poctivá litina od roku 1992. Vycházeli jsme z jednoduchého přesvědčení: pánev, na které
							se opéká steak, nesmí být jednorázová. Tenký plech, nepřilnavá vrstva, dvě sezóny — a do koše.
							Jsme proti.
						</p>
						<p>
							Proto volíme masivní litinu: zahřívá se pomalu, opéká rovnoměrně a nebojí se ani trouby, ani
							ohně. Každá pánev k vám přichází již vypálená a připravená k práci — a s léty se jen zlepšuje.
						</p>
					</div>

					<dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
						<div>
							<dt className="font-display text-4xl text-gold">25</dt>
							<dd className="mt-1 font-condensed text-[11px] tracking-[0.18em] text-cream/60">
								Let záruky
							</dd>
						</div>
						<div>
							<dt className="font-display text-4xl text-flame">4</dt>
							<dd className="mt-1 font-condensed text-[11px] tracking-[0.18em] text-cream/60">
								Zdrojů tepla
							</dd>
						</div>
						<div>
							<dt className="font-display text-4xl text-blush">0</dt>
							<dd className="mt-1 font-condensed text-[11px] tracking-[0.18em] text-cream/60">
								Chemických povrchů
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</section>
	);
}
