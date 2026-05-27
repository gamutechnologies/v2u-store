// app/page.tsx

import HeroSection from "@/app/home/HeroSection";
import HeroStatsBar from "@/app/home/HeroStatsBar";
import HeroEditorialGrid from "@/app/home/HeroEditorialGrid";
import BrandShowcaseSection from "@/app/home/BrandShowcaseSection";
import FeaturedCategoriesSection from "@/app/home/FeaturedCategoriesSection";
import FeaturedProductsSection from "@/app/home/FeaturedProductsSection";
import PromoBannerSection from "@/app/home/PromoBannerSection";
import WhyChooseUsSection from "@/app/home/WhyChooseUsSection";
import JoinCommunitySection from "@/app/home/JoinCommunitySection";
import HomePopup from "@/components/custom/HomePopUp";
import ExpandingShowcaseSection from "@/app/home/ExpandingShowcaseSection";

export default function Home() {
  return (
    <>
      <HomePopup />

      <HeroSection />
      <HeroStatsBar />
      <HeroEditorialGrid />
      <ExpandingShowcaseSection />
      <FeaturedCategoriesSection />
      <FeaturedProductsSection />
      <PromoBannerSection />
      <BrandShowcaseSection />
      <WhyChooseUsSection />
      <JoinCommunitySection />
    </>
  );
}
