import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedDrops } from "@/components/sections/FeaturedDrops";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDrops />
      <EditorialSplit />
      <MarqueeStrip />
      <ProductGrid />
      <NewsletterSection />
    </>
  );
}