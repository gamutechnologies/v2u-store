import AboutHeroSection from "@/app/about/sections/AboutHeroSection";
import CompanyStorySection from "@/app/about/sections/CompanyStorySection";
import WhyChooseUsSection from "@/app/about/sections/WhyChooseUsSection";
import AwardsSection from "@/app/about/sections/AwardsSection";

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <CompanyStorySection />
      <WhyChooseUsSection />
      <AwardsSection />
    </>
  );
}