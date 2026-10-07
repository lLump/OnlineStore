import { CreditCardIcon, LeafIcon, PackageOpenIcon, ShieldIcon, TruckIcon } from "lucide-react";

const benefits = [
	{ icon: TruckIcon, title: "Doprava zdarma", sub: "od 1 500 Kč" },
	{ icon: PackageOpenIcon, title: "Odesíláme z ČR", sub: "skladem" },
	{ icon: ShieldIcon, title: "14 dní", sub: "na vrácení" },
	{ icon: CreditCardIcon, title: "Bezpečná platba", sub: "online i na dobírku" },
	{ icon: LeafIcon, title: "Ověřená kvalita", sub: "stovky spokojených zákazníků" },
];

export function PressStrip() {
	return (
		<section className="relative bg-[#f0ebe2] border-y border-border">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
				<ul className="grid grid-cols-1 lg:grid-cols-5">
					{benefits.map((b, i) => (
						<li
							key={b.title}
							className={`flex items-center justify-center gap-3 py-4 px-2 ${i > 0 ? "border-t lg:border-t-0 lg:border-l" : ""} border-border/60`}
						>
							<b.icon className="h-6 w-6 shrink-0 text-foreground" strokeWidth={1.5} aria-hidden />
							<span className="flex flex-col">
								<span className="text-sm font-semibold text-foreground">{b.title}</span>
								<span className="text-xs text-foreground/60">{b.sub}</span>
							</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
