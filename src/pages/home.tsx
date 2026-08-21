import Layout from "@/components/layout";
import Hero from "@/components/sections/home/hero";
import { lazy, Suspense } from "react";

const Features = lazy(() => import("@/components/sections/home/features"));

const Proof = lazy(() => import("@/components/sections/home/proof"));
const Program = lazy(() => import("@/components/sections/home/program"));
const Pricing = lazy(() => import("@/components/sections/home/pricing"));
const Testimonials = lazy(() => import("@/components/sections/home/testimonials"));
const FAQ = lazy(() => import("@/components/sections/shared/faq"));

const Home = () => {

  return (
    <Layout>
      <Hero />
      <Suspense fallback={null}>
        <Features />
      </Suspense>
      <Suspense fallback={null}>
        <Proof />
      </Suspense>
      <Suspense fallback={null}>
        <Program />
      </Suspense>
      <Suspense fallback={null}>
        <Pricing />
      </Suspense>
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={null}>
        <FAQ />
      </Suspense>

    </Layout>
  );
};

export default Home;
