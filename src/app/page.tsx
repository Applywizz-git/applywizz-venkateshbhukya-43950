"use client";

import About from "@/components/About/About";
import Starfield from "@/components/Background/Starfield";
import Certifications from "@/components/Certifications/Certifications";
import Contact from "@/components/Contact/Contact";
import CustomCursor from "@/components/Cursor/CustomCursor";
import Education from "@/components/Education/Education";
import Experience from "@/components/Experience/Experience";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Loader from "@/components/Loader/Loader";
import Navigation from "@/components/Navigation/Navigation";
import Projects from "@/components/Projects/Projects";
import SmoothScroll from "@/components/Providers/SmoothScroll";
import Skills from "@/components/Skills/Skills";

export default function HomePage() {
  return (
    <SmoothScroll>
      <Starfield />
      <Loader />
      <CustomCursor />
      <Navigation />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
