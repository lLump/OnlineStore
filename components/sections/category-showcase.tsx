import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

const categories = [
	{
		name: "Pánve",
		slug: "panve",
		img: "https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/01a10867-1e86-7768-aacd-b4a2cbfcf72e/test/pasted-image-1791238803922-0-t3GWrVKFImSmAO7weBuXzYlGmIIz3e-hplqsSCvOGA6uyGYSbgSyc2WdvVpSD.png",
	},
	{
		name: "Grilovací pánve",
		slug: "grilovaci-panve",
		img: "https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/01a10867-1e86-7768-aacd-b4a2cbfcf72e/test/pasted-image-1791238840928-0-OI6H8ApqCKcBBHdWBvaFx9VHLQjhdl-kd4E0fxU0itnWDGmIfKgSCX5QHeU8c.png",
	},
	{
		name: "Hrnce",
		slug: "hrnce",
		img: "https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/01a10867-1e86-7768-aacd-b4a2cbfcf72e/test/pasted-image-1791238875220-0-ERqk7FTcukzxSYne5cYx8giRKq8ZLQ-cmqTHlv7JGoO1sEjsSoFn3gioEDnnY.png",
	},
	{
		name: "Kotlíky",
		slug: "kotliky",
		img: "https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/01a10867-1e86-7768-aacd-b4a2cbfcf72e/test/pasted-image-1791238891770-0-HWEUZ4BhDjErjPM7jeaW8gEJStfylN-P74e8hE3C3aQsNPBVqSMr9UyUXqM7e.png",
	},
	{
		name: "Pekáče",
		slug: "pekace",
		img: "https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/01a10867-1e86-7768-aacd-b4a2cbfcf72e/test/pasted-image-1791238910970-0-m4XNSZRk5pj8B67Onbd5VHC2k3mjdD-FnYtYwOJfEar0FUIyqAwqMl7xp8ePf.png",
	},
	{
		name: "Příslušenství",
		slug: "prislusenstvi",
		img: "https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/01a10867-1e86-7768-aacd-b4a2cbfcf72e/test/pasted-image-1791238948874-0-p6WaefyHyPH2iXxpKT2wbKyMOhheTe-peIfXi0NLWKNVyf99GzXhmKqVSKIfr.png",
	},
	{
		name: "Péče o litinu",
		slug: "pece-o-litinu",
		img: "https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/01a10867-1e86-7768-aacd-b4a2cbfcf72e/test/pasted-image-1791238964037-0-HoXasEOl6PYj6twksVIbSp0qzV7Hwc-0uvpYgjJvbpP2oYqfj24AvLkkjOQKu.png",
	},
];

function PanDivider() {
	return (
		<div className="mx-auto mt-1.5 flex items-center justify-center gap-4" aria-hidden>
			<span className="h-[2px] w-20 sm:w-32 bg-gradient-to-r from-transparent to-gold" />
			<svg width="46" height="24" viewBox="0 0 46 24" className="shrink-0 text-soot">
				<ellipse cx="17" cy="15" rx="14" ry="8" fill="currentColor" />
				<line x1="30" y1="13" x2="43" y2="7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
			</svg>
			<span className="h-[2px] w-20 sm:w-32 bg-gradient-to-l from-transparent to-gold" />
		</div>
	);
}

export function CategoryShowcase() {
	return (
		<section id="products" className="relative bg-[#f8f7f4]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-10 pb-8 sm:pb-10">
				<h2 className="font-display text-4xl sm:text-5xl text-soot text-center leading-[1.05]">
					Vyberte si z naší nabídky
				</h2>
				<PanDivider />
				<div className="mt-3 flex lg:grid lg:grid-cols-7 gap-1.5 overflow-x-auto lg:overflow-visible pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
					{categories.map((c) => (
						<a
							key={c.slug}
							href={`/products?category=${c.slug}`}
							className="group shrink-0 w-52 lg:w-auto lg:shrink rounded-md overflow-hidden bg-white"
						>
							<div className="relative aspect-[3/2] overflow-hidden">
								{c.img ? (
									<Image
										src={c.img}
										alt={c.name}
										fill
										sizes="(min-width: 1024px) 13vw, 60vw"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								) : (
									<div className="h-full w-full bg-secondary" />
								)}
							</div>
							<div className="flex items-center justify-between gap-2 py-3 pl-4 pr-3">
								<span className="text-sm font-bold text-soot truncate">{c.name}</span>
								<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0efea] transition-colors group-hover:bg-[#e7e4da]">
									<ArrowRightIcon className="h-3.5 w-3.5 text-soot" aria-hidden />
								</span>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
