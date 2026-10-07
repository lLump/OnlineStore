"use client";

import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { YnsLink } from "@/components/yns-link";
import { MobileSearchInput } from "./search-input";

export type NavLink = {
	href: string;
	label: string;
};

const desktopLinkClass =
	"text-sm font-medium text-foreground hover:text-foreground/60 transition-colors whitespace-nowrap";

export function Navbar({
	links,
	categories,
}: {
	links: NavLink[];
	categories: NavLink[];
}) {
	const [open, setOpen] = useState(false);
	const [catsOpen, setCatsOpen] = useState(false);
	const catsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!catsOpen) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setCatsOpen(false);
		};
		const onPointer = (event: PointerEvent) => {
			if (catsRef.current && !catsRef.current.contains(event.target as Node)) {
				setCatsOpen(false);
			}
		};
		document.addEventListener("keydown", onKey);
		document.addEventListener("pointerdown", onPointer);
		return () => {
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("pointerdown", onPointer);
		};
	}, [catsOpen]);

	// "O nás" splits the row: Domů/Katalog sit left of the categories dropdown,
	// the tail (O nás, Recepty) sits right of it.
	const splitAt = Math.max(
		links.findIndex((link) => link.label === "O nás"),
		0,
	);
	const mainLinks = links.slice(0, splitAt);
	const tailLinks = links.slice(splitAt);

	return (
		<>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<button
						type="button"
						aria-label="Open menu"
						className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-secondary lg:hidden"
					>
						<Menu className="h-6 w-6" />
					</button>
				</SheetTrigger>
				<SheetContent side="left" className="gap-0 overflow-y-auto p-6">
					<SheetTitle className="sr-only">Menu</SheetTitle>
					<div className="mt-6">
						<MobileSearchInput onNavigate={() => setOpen(false)} />
					</div>
					<nav className="mt-4 flex flex-col gap-1">
						{mainLinks.map((link) => (
							<YnsLink
								key={link.href}
								prefetch="eager"
								href={link.href}
								onClick={() => setOpen(false)}
								className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
							>
								{link.label}
							</YnsLink>
						))}
						<div className="my-2 border-t border-border pt-3">
							<p className="px-3 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
								Kategorie
							</p>
							{categories.map((category) => (
								<YnsLink
									key={category.href}
									prefetch="eager"
									href={category.href}
									onClick={() => setOpen(false)}
									className="block rounded-lg px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
								>
									{category.label}
								</YnsLink>
							))}
						</div>
						{tailLinks.map((link) => (
							<YnsLink
								key={link.href}
								prefetch="eager"
								href={link.href}
								onClick={() => setOpen(false)}
								className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
							>
								{link.label}
							</YnsLink>
						))}
					</nav>
				</SheetContent>
			</Sheet>
			<nav className="hidden lg:flex items-center gap-10 min-w-0">
				{mainLinks.map((link) => (
					<YnsLink
						key={link.href}
						prefetch="eager"
						href={link.href}
						className={desktopLinkClass}
					>
						{link.label}
					</YnsLink>
				))}
				<div ref={catsRef} className="relative">
					<button
						type="button"
						aria-expanded={catsOpen}
						aria-haspopup="true"
						onClick={() => setCatsOpen((value) => !value)}
						className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:text-foreground/60"
					>
						Kategorie
						<svg
							aria-hidden
							viewBox="0 0 12 12"
							className={`h-3 w-3 transition-transform ${catsOpen ? "rotate-180" : ""}`}
						>
							<path
								d="M2.5 4.5 6 8l3.5-3.5"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					{catsOpen ? (
						<div className="absolute left-0 top-full z-50 mt-2 w-60 rounded-xl border border-border bg-white p-2 shadow-lg">
							{categories.map((category) => (
								<YnsLink
									key={category.href}
									prefetch="eager"
									href={category.href}
									onClick={() => setCatsOpen(false)}
									className="block rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
								>
									{category.label}
								</YnsLink>
							))}
						</div>
					) : null}
				</div>
				{tailLinks.map((link) => (
					<YnsLink
						key={link.href}
						prefetch="eager"
						href={link.href}
						className={desktopLinkClass}
					>
						{link.label}
					</YnsLink>
				))}
			</nav>
		</>
	);
}