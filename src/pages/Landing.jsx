import React from 'react'

import Headers from '@/components/Headers';
import Hero from '@/components/Hero';
import Feature from '@/components/Feature';
import Cta from '@/components/Cta';
// import Team from '@/components/Team';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
// import WorldMapComp from '@/components/WorldMap';



function Landing() {
  return (
    <>
      <Headers />
      <main className="min-h-screen pt-20 bg-white dark:bg-gray-900 content-container">
        <Hero />
        <Feature />
        <Cta />
        {/* <WorldMapComp /> */}
        {/* <Team /> */}
        <BlogSection />
      </main>
      <Footer />
    </>
  )
}

export default Landing;
