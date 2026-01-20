import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Colibri from '@/components/sections/Colibri';
import Stats from '@/components/sections/Stats';
import WhyUs from '@/components/sections/WhyUs';
import Process from '@/components/sections/Process';
import Coverage from '@/components/sections/Coverage';
import Clients from '@/components/sections/Clients';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import FloatingContact from '@/components/ui/FloatingContact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Colibri />
      <WhyUs />
      <Process />
      <Coverage />
      <Clients />
      <FAQ />
      <Contact />
      <FloatingContact />
    </>
  );
}
