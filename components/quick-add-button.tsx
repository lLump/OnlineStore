"use client";

import { ShoppingBag } from "lucide-react";
import { startTransition } from "react";
import { toast } from "sonner";
import { addToCart } from "@/app/cart/actions";
import { useCart } from "@/app/cart/cart-context";

type QuickAddButtonProps = {
	variantId: string;
	variantPrice: string;
	variantImages: string[];
	product: {
		id: string;
		name: string;
		slug: string;
		images: string[];
	};
};

export function QuickAddButton({ variantId, variantPrice, variantImages, product }: QuickAddButtonProps) {
	const { openCart, dispatch } = useCart();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		openCart();

		startTransition(async () => {
			dispatch({
				type: "ADD_ITEM",
				item: {
					quantity: 1,
					productVariant: {
						id: variantId,
						price: variantPrice,
						images: variantImages,
						product,
					},
				},
			});

			// The server clamps to available stock and still returns the cart — surface
			// the failure instead of letting the optimistic item silently vanish.
			const result = await addToCart(variantId, 1);
			const line = result.cart?.lineItems.find((item) => item.productVariant.id === variantId);
			if (!result.success || !line) {
				toast.error("Toto zboží není skladem");
			}
		});
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-label={`Do košíku: ${product.name}`}
			className="mt-auto inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-gold text-xs font-medium text-cream transition-colors hover:bg-gold-soft hover:text-soot"
		>
			<ShoppingBag className="h-4 w-4" aria-hidden />
			Do košíku
		</button>
	);
}
