import { HeroBase } from "@/components/sections/hero/HeroBase";
import { heroSectionConfig } from "@/config/hero";
import { LogoStripBase } from "@/components/sections/strip/LogoStripBase";
import { logoStripSectionConfig } from "@/config/hero";
import { FeaturesBase } from "@/components/sections/features/FeaturesBase";
import { featuresSectionConfig } from "@/config/features";
import { StepsBase } from "@/components/sections/features/StepsBase";
import { stepsSectionConfig } from "@/config/features";
import { PricingBase } from "@/components/sections/pricing/PricingBase";
import { pricingSectionConfig } from "@/config/pricing";
import { TestimonialsBase } from "@/components/sections/testimonials/TestimonialsBase";
import { testimonialsSectionConfig } from "@/config/testimonials";
import { AboutBase } from "@/components/sections/aboutus/AboutUsBase";
import { aboutSectionConfig } from "@/config/aboutus";
import { FAQBase } from "@/components/sections/faq/FAQsBase";
import { faqSectionConfig } from "@/config/faq";
import { StatsRowBase } from "@/components/sections/cards/StatsRowBase";
import { statsRowSectionConfig } from "@/config/stats";

export default function HomePage() {
  return (
    <main>
       <HeroBase {...heroSectionConfig} />
       <StatsRowBase {...statsRowSectionConfig} />
       <LogoStripBase {...logoStripSectionConfig} />
       <FeaturesBase {...featuresSectionConfig} />
       <StepsBase {...stepsSectionConfig} />
       <PricingBase {...pricingSectionConfig} />
       <TestimonialsBase {...testimonialsSectionConfig} />
        <AboutBase {...aboutSectionConfig} />
        <FAQBase {...faqSectionConfig} />
    </main>
  );
}