// Sandbox inspectors (dev-only). Next.js inlines NEXT_PUBLIC_* at build time, so production
// builds DCE this branch.
if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
	void import("commerce-kit/sandbox-inspectors");
}
// Feedback toolbar — loaded at runtime from the central CDN so toolbar fixes ship without
// rebuilding the store. The host mirrors the preview domain to stay registrable-domain-aligned.
if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
	const base = location.hostname.endsWith(".yns.store")
		? "https://toolbar.yns.store"
		: "https://toolbar.yns.cx";
	const s = document.createElement("script");
	s.src = base + "/toolbar.js";
	s.async = true;
	document.head.appendChild(s);
}
