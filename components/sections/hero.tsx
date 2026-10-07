import { FlameIcon, GemIcon, LeafIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { YnsLink } from "../yns-link";

const features = [
	{
		icon: FlameIcon,
		title: "Univerzální použití",
		body: "sporák, trouba, gril i oheň",
	},
	{
		icon: GemIcon,
		title: "Masivní konstrukce",
		body: "dlouhá životnost",
	},
	{
		icon: LeafIcon,
		title: "Přírodní materiál",
		body: "bez chemického povrchu",
	},
	{
		icon: StarIcon,
		title: "Tradiční výrobce",
		body: "od roku 1992",
	},
];

function FeatureList({ roomy = false }: { roomy?: boolean }) {
	return (
		<ul className={roomy ? "space-y-12 ml-auto w-fit" : "space-y-7"}>
			{features.map((f) => (
				<li key={f.title} className="flex items-start gap-4">
					<f.icon className="h-8 w-8 shrink-0 text-[#FFC72C]" strokeWidth={2} aria-hidden />
					<span>
						<span className="block text-[15px] font-semibold text-white">{f.title}</span>
						<span className="mt-0.5 block text-sm text-cream/75 leading-snug">{f.body}</span>
					</span>
				</li>
			))}
		</ul>
	);
}

export function Hero() {
	return (
		<section className="relative overflow-hidden bg-soot text-cream">
			{/* Full-bleed background photo */}
			<div aria-hidden className="absolute inset-0">
				<Image
					src="https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/01a10867-1e86-7768-aacd-b4a2cbfcf72e/test/01a10dcd-274f-770c-a4d7-0ccc89f3c63d-1791232929640-VCtBMT8hB85W2DrSW8FsirRThOzkwK.png"
					alt="Стейк с томатами, чесноком и розмарином в чугунной сковороде на тёмном деревянном столе"
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-soot/85 via-soot/5 to-soot/30" />
			</div>

			<div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
				<div className="grid grid-cols-1 items-center min-h-[640px] lg:min-h-[680px] py-16 lg:py-20">
					{/* Left: headline + CTA */}
					<div className="lg:col-span-7 lg:pr-8 lg:max-w-2xl">
						<h1 className="font-display text-[40px] sm:text-6xl lg:text-7xl leading-[1.02] text-white heading-shadow">
							Poctivá litina<br />na celý&nbsp;život.
						</h1>
						<p className="mt-6 max-w-xl text-base sm:text-lg text-cream/90 leading-relaxed">
							Litinové nádobí Syton pro kuchyni, gril i otevřený oheň.
						</p>
						<div className="mt-9 flex flex-wrap items-center gap-4">
							<YnsLink
								prefetch={"eager"}
								href="/products"
								className="group inline-flex items-center gap-2 h-12 px-7 bg-gold text-cream rounded-sm font-normal tracking-[0.16em] text-sm hover:bg-gold-soft hover:text-soot transition-colors"
							>
								Prohlédnout nádobí
								<span aria-hidden className="inline-flex items-center text-xl leading-none group-hover:translate-x-0.5 transition-transform">
									→
								</span>
							</YnsLink>
						</div>
					</div>
				</div>

				{/* Mobile / tablet: panel in flow, gradient fading left */}
				<div className="pb-16 sm:pb-20 lg:hidden -mt-8">
					<div className="bg-gradient-to-l from-soot/90 via-soot/65 to-soot/20 p-6 sm:p-8 -mx-4 sm:-mx-6 px-8 sm:px-10">
						<FeatureList />
					</div>
				</div>
			</div>

			{/* Desktop: panel flush to the right edge, full hero height, dark scrim with leftward gradient */}
			<div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[500px] xl:w-[600px]">
				<div className="flex h-full flex-col justify-center items-end bg-gradient-to-l from-soot/95 via-soot/65 to-transparent pr-24 pl-10 py-12">
					<FeatureList roomy />
				</div>
			</div>
		</section>
	);
}
