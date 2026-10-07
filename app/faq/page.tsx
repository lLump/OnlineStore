import { Mail } from "lucide-react";
import type { Metadata } from "next";
import { type FAQCategory, faqCategories } from "@/app/faq/faq-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { YnsLink } from "@/components/yns-link";
import { JsonLdScript } from "@/lib/json-ld";

export const metadata: Metadata = {
	title: "Časté dotazy",
	description: "Odpovědi na nejčastější dotazy k objednávkám, platbám, dopravě, vrácení a dalším tématům.",
	alternates: { canonical: "/faq" },
	openGraph: {
		type: "website",
		title: "Časté dotazy",
		description: "Odpovědi na nejčastější dotazy k objednávkám, platbám, dopravě, vrácení a dalším tématům.",
		url: "/faq",
	},
};

function buildFaqJsonLd(categories: FAQCategory[]): Record<string, unknown> {
	const mainEntity = categories.flatMap((category) =>
		category.questions.map((q) => ({
			"@type": "Question",
			name: q.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: q.answer,
			},
		})),
	);

	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity,
	};
}

function CategoryNav({ categories }: { categories: FAQCategory[] }) {
	return (
		<nav className="flex flex-wrap gap-2">
			{categories.map((category) => (
				<a
					key={category.id}
					href={`#${category.id}`}
					className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
				>
					{category.title}
				</a>
			))}
		</nav>
	);
}

function FAQSection({ category }: { category: FAQCategory }) {
	return (
		<section id={category.id} className="scroll-mt-24">
			<h2 className="text-2xl font-medium tracking-tight mb-4">{category.title}</h2>
			<Accordion type="single" collapsible className="rounded-lg border border-border px-4">
				{category.questions.map((item, index) => (
					<AccordionItem key={`${category.id}-${index}`} value={`${category.id}-${index}`}>
						<AccordionTrigger>{item.question}</AccordionTrigger>
						<AccordionContent>
							<p className="text-muted-foreground leading-relaxed">{item.answer}</p>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}

function ContactCard() {
	return (
		<div className="rounded-lg border border-border bg-secondary/30 p-8 text-center">
			<h2 className="text-2xl font-medium tracking-tight">Máte ještě otázky?</h2>
			<p className="mt-2 text-muted-foreground">
				Jsme tu pro vás. Napište nám a ozveme se co nejdříve.
			</p>
			<div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
				<Mail className="h-4 w-4" />
				<span>Napište nám přes kontaktní údaje na našem webu</span>
			</div>
		</div>
	);
}

export default function FAQPage() {
	return (
		<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
			<JsonLdScript data={buildFaqJsonLd(faqCategories)} />
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
				<span className="text-sm">Časté dotazy</span>
				<h1 className="mt-4 text-4xl font-medium tracking-tight">Časté dotazy</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Najděte odpovědi na nejčastější otázky k vašim objednávkám, platbám, dopravě a dalším tématům.
				</p>
			</div>

			{/* Category Navigation */}
			<div className="mb-10">
				<CategoryNav categories={faqCategories} />
			</div>

			{/* FAQ Sections */}
			<div className="space-y-12">
				{faqCategories.map((category) => (
					<FAQSection key={category.id} category={category} />
				))}
			</div>

			{/* Contact Card */}
			<div className="mt-16">
				<ContactCard />
			</div>
		</div>
	);
}
