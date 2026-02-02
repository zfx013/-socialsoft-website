import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Poles from '@/components/sections/Poles';
import AboutCTA from '@/components/sections/AboutCTA';
import Contact from '@/components/sections/Contact';
import FloatingContact from '@/components/ui/FloatingContact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Poles />
      <AboutCTA />
      <Contact />
      <FloatingContact />
    </>
  );
}
