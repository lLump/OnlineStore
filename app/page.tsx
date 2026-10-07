import { About } from "@/components/sections/about";
import { CategoryShowcase } from "@/components/sections/category-showcase";
import { Hero } from "@/components/sections/hero";
import { Newsletter } from "@/components/sections/newsletter";
import { PressStrip } from "@/components/sections/press-strip";
import { RecipeFeature } from "@/components/sections/recipe-feature";

export default function Home() {
	return (
		<>
			<Hero />
			<PressStrip />
			<CategoryShowcase />
			<RecipeFeature />
			<About />
			<Newsletter />
		</>
	);
}
