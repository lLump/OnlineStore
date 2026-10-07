import "@/app/globals.css";
import { CreditCard, Mail, Package, Phone, ShieldCheck, Truck } from "lucide-react";

import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Anton, Archivo, Inter } from "next/font/google";
import Image from "next/image";
import { Suspense } from "react";
import { CartProvider } from "@/app/cart/cart-context";
import { CartSidebar } from "@/app/cart/cart-sidebar";
import { CartButton } from "@/app/cart-button";
import { Footer } from "@/app/footer";
import { Navbar, type NavLink } from "@/app/navbar";
import { SearchInput } from "@/app/search-input";
import { AuthButton } from "@/components/auth-button";
import { CookieConsent } from "@/components/cookie-consent";
import { ErrorOverlayRemover, NavigationReporter } from "@/components/devtools";
import { NewsletterDialog } from "@/components/newsletter-dialog";
import { Toaster } from "@/components/ui/sonner";
import { YnsLink } from "@/components/yns-link";
import { AUTH_ENABLED } from "@/lib/auth-config";
import { commerce, getCanonicalUrl, getStoreFaviconUrl, meGetCached } from "@/lib/commerce";
import { getCartCookieJson } from "@/lib/cookies";
import { StoreJsonLd } from "@/lib/json-ld";

const inter = Inter({
	variable: "--font-body",
	subsets: ["latin"],
	display: "swap",
});

const display = Archivo({
	variable: "--font-display",
	subsets: ["latin"],
	weight: ["600", "700", "800"],
	display: "swap",
});

const condensed = Anton({
	variable: "--font-condensed",
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});

async function getStoreMetadata(): Promise<Metadata> {
	"use cache";
	cacheLife("hours");
	const me = await meGetCached();
	const storeName = me.store.name || "Your Next Store";
	const storeDescription =
		me.store.settings?.storeDescription || "Ready-to-eat pasta sauce, slow-cooked with attitude.";
	const faviconUrl = getStoreFaviconUrl(me.store.settings) ?? "/logo.svg";
	const storeLogo =
		typeof me.store.settings?.logo === "string" ? me.store.settings.logo : me.store.settings?.logo?.imageUrl;
	const ogImage = me.store.settings?.ogimage || storeLogo || "/logo.svg";

	return {
		title: {
			default: storeName,
			template: `%s — ${storeName}`,
		},
		description: storeDescription,
		applicationName: storeName,
		alternates: {
			canonical: "/",
		},
		openGraph: {
			type: "website",
			siteName: storeName,
			title: storeName,
			description: storeDescription,
			url: "/",
			images: [{ url: ogImage, alt: storeName }],
		},
		twitter: {
			card: "summary_large_image",
			title: storeName,
			description: storeDescription,
			images: [ogImage],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1,
			},
		},
		icons: {
			icon: [
				{ url: faviconUrl, sizes: "any", type: "image/svg+xml" },
				{ url: faviconUrl, sizes: "192x192", type: "image/png" },
			],
			apple: [{ url: faviconUrl, sizes: "180x180" }],
			shortcut: faviconUrl,
		},
		manifest: "/manifest.webmanifest",
	};
}

export async function generateMetadata(): Promise<Metadata> {
	const metadata = await getStoreMetadata();
	// URL instances can't cross the "use cache" serialization boundary, so
	// metadataBase is attached outside the cached scope (env-only, no IO).
	return { ...metadata, metadataBase: new URL(getCanonicalUrl()) };
}

async function getInitialCart() {
	const cartCookie = await getCartCookieJson();

	if (!cartCookie?.id) {
		return { cart: null, cartId: null };
	}

	try {
		const cart = await commerce.cartGet({ cartId: cartCookie.id });
		return { cart: cart ?? null, cartId: cartCookie.id };
	} catch {
		return { cart: null, cartId: cartCookie.id };
	}
}

async function getNavLinks(): Promise<{ links: NavLink[]; categories: NavLink[] }> {
	"use cache";
	cacheLife("hours");
	const { data } = await commerce.categoriesBrowse({ active: true });
	return {
		links: [
			{ href: "/", label: "Domů" },
			{ href: "/products", label: "Katalog" },
			{ href: "/about", label: "O nás" },
			{ href: "/recepty", label: "Recepty" },
		],
		categories: data.map((category) => ({
			href: `/products?category=${category.slug}`,
			label: category.name,
		})),
	};
}

const LOGO_TAB_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 74' preserveAspectRatio='none'%3E%3Cpath d='M4 0 H96 Q100 0 100 4 L82 69 Q80 74 73 74 H27 Q20 74 18 69 L0 4 Q0 0 4 0 Z' fill='%23000'/%3E%3C/svg%3E")`;

function AnnouncementBar() {
	const perks = [
		{ icon: Truck, label: "Doprava zdarma od 1 500 Kč", hide: "" },
		{ icon: Package, label: "Odesíláme z ČR", hide: "hidden sm:inline-flex" },
		{ icon: ShieldCheck, label: "14 dní na vrácení", hide: "hidden md:inline-flex" },
		{ icon: CreditCard, label: "Bezpečná platba", hide: "hidden lg:inline-flex" },
	];
	return (
		<div className="bg-soot text-cream/85 border-b border-black/30">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 py-1.5 text-xs font-sans tracking-[0.02em]">
				<div className="flex items-center gap-4 sm:gap-8 lg:gap-12 min-w-0">
					{perks.map(({ icon: Icon, label, hide }) => (
						<span key={label} className={`inline-flex items-center gap-1.5 whitespace-nowrap ${hide}`}>
							<Icon aria-hidden className="h-3.5 w-3.5 shrink-0 text-flame" strokeWidth={1.75} />
							{label}
						</span>
					))}
				</div>
				<div className="hidden sm:flex items-center gap-3 sm:gap-10">
					<a
						href="tel:+42012345678"
						className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-gold-soft"
					>
						<Phone aria-hidden className="h-3.5 w-3.5 shrink-0 text-flame" strokeWidth={1.75} />
						+420 123 456 78
					</a>
					<a
						href="mailto:info@syton.cz"
						className="hidden md:inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-gold-soft"
					>
						<Mail aria-hidden className="h-3.5 w-3.5 shrink-0 text-flame" strokeWidth={1.75} />
						info@syton.cz
					</a>
				</div>
			</div>
		</div>
	);
}

async function CartProviderWrapper({ children }: { children: React.ReactNode }) {
	const [{ cart, cartId }, nav] = await Promise.all([getInitialCart(), getNavLinks()]);

	return (
		<CartProvider initialCart={cart} initialCartId={cartId}>
			<div className="flex min-h-screen flex-col bg-background">
				<AnnouncementBar />
				<header className="sticky top-0 z-50 bg-[#f7f6f1] text-foreground border-b border-border shadow-[0_1px_0_rgba(23,36,46,0.08)]">
					<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative">
						<YnsLink
							prefetch={"eager"}
							href="/"
							aria-label="Syton — на главную"
							className="absolute left-4 top-0 z-10 flex items-start bg-[#f7f6f1] px-12 pb-3 pt-1 sm:left-6 lg:left-10 lg:pb-4"
							style={{
								WebkitMaskImage: LOGO_TAB_MASK,
								maskImage: LOGO_TAB_MASK,
								WebkitMaskSize: "100% 100%",
								maskSize: "100% 100%",
								WebkitMaskRepeat: "no-repeat",
								maskRepeat: "no-repeat",
							}}
						>
							<Image
								src="/logo-mark.png"
								alt="Syton — на главную"
								width={357}
								height={292}
								priority
								className="h-20 w-auto lg:h-24"
							/>
						</YnsLink>
						<div className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,2.2fr)_minmax(0,1.1fr)] items-center content-center h-16 sm:h-20 pt-1.5 sm:pt-2 gap-4">
							<div />
							<div className="justify-self-stretch min-w-0">
								<Navbar links={nav.links} categories={nav.categories} />
							</div>
							<div className="flex min-w-0 items-center justify-end gap-1 sm:gap-2">
								<Suspense>
									<SearchInput />
								</Suspense>
								{AUTH_ENABLED && <AuthButton />}
								<CartButton />
							</div>
						</div>
					</div>
				</header>
				<div className="flex-1">{children}</div>
				<Footer />
			</div>
			<CartSidebar />
		</CartProvider>
	);
}

async function getHtmlLang(): Promise<string> {
	try {
		const me = await meGetCached();
		return me.store.settings?.defaultLanguage?.split("-")[0] ?? "en";
	} catch {
		return "en";
	}
}

async function NewsletterPopupSection() {
	const me = await meGetCached();
	if (!me.store.settings?.enabledTools?.newsletterPopup) {
		return null;
	}
	return <NewsletterDialog settings={me.store.settings?.newsletterPopup} />;
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const env = process.env.VERCEL_ENV || "development";
	const lang = await getHtmlLang();

	return (
		<html lang={lang}>
			<body className={`${inter.variable} ${display.variable} ${condensed.variable} antialiased`}>
				{/* DO NOT REMOVE / REORDER: required for GDPR + GTM Consent Mode v2. Must stay at top of <body>. */}
				<Suspense>
					<CookieConsent />
				</Suspense>
				<Suspense>
					<StoreJsonLd />
				</Suspense>
				<Suspense>
					<CartProviderWrapper>{children}</CartProviderWrapper>
				</Suspense>
				<Suspense>
					<NewsletterPopupSection />
				</Suspense>
				<Toaster richColors position="top-center" />
				{env === "development" && (
					<>
						<NavigationReporter />
						<ErrorOverlayRemover />
					</>
				)}
			</body>
		</html>
	);
}
