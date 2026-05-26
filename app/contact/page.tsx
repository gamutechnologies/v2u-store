import ContactFormSection from "@/app/contact/sections/ContactFormSection";
import ContactHeroSection from "@/app/contact/sections/ContactHeroSection";
import ContactInfoSection from "@/app/contact/sections/ContactInfoSection";
import FAQSection from "@/app/contact/sections/FAQSection";
import MapSection from "@/app/contact/sections/MapSection";


export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactInfoSection />
      <ContactFormSection />
      <FAQSection />
      <MapSection />
    </>
  );
}