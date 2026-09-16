import Layout from "@/components/layout";
import Hero from "@/components/sections/home/hero";
import SEO from "@/components/seo";
import { lazy, Suspense } from "react";

const Walls = lazy(() => import("@/components/sections/home/walls"));
const Inverse = lazy(() => import("@/components/sections/home/inverse"));
const Story = lazy(() => import("@/components/sections/home/story"));
const NotYourFault = lazy(() => import("@/components/sections/home/not-your-fault"));
const Features = lazy(() => import("@/components/sections/home/features"));
const Trajectory = lazy(() => import("@/components/sections/home/trajectory"));
const Validations = lazy(() => import("@/components/sections/home/validations"));
const Pricing = lazy(() => import("@/components/sections/home/pricing"));
const Proof = lazy(() => import("@/components/sections/home/proof"));
const Guarantee = lazy(() => import("@/components/sections/home/guarantee"));
const Spots = lazy(() => import("@/components/sections/home/spots"));
const FAQ = lazy(() => import("@/components/sections/shared/faq"));
import JoinCta from "@/components/sections/home/join-cta";

const Home = () => {

  return (
    <Layout>
      <SEO
        title="Vends des produits digitaux sur TikTok sans jamais te montrer"
        description="9 modules, ta niche et ton produit validés avec moi, un suivi en direct. Ni stock, ni publicité, ni caméra."
        canonicalUrl="/"
      />

      {/* 1 — Hero */}
      <Hero />

      <Suspense fallback={null}>
        {/* 2 — Les 4 murs */}
        <Walls />
      </Suspense>
      <Suspense fallback={null}>
        {/* 3 — L'inverse */}
        <Inverse />
      </Suspense>
      <Suspense fallback={null}>
        {/* 4 — Mon histoire */}
        <Story />
      </Suspense>
      <Suspense fallback={null}>
        {/* 5 — C'est pas ta faute */}
        <NotYourFault />
      </Suspense>
      <Suspense fallback={null}>
        {/* 6 — Les 3 étapes */}
        <Features />
      </Suspense>
      <JoinCta label="Méthode claire, passage à l'acte." />
      <Suspense fallback={null}>
        {/* 8 — Trajectoire */}
        <Trajectory />
      </Suspense>
      <Suspense fallback={null}>
        {/* 9 — Les validations */}
        <Validations />
      </Suspense>
      <JoinCta label="Tu as vu le système. À toi de jouer." />
      <Suspense fallback={null}>
        {/* 10 — Le stack */}
        <Pricing />
      </Suspense>
      <Suspense fallback={null}>
        {/* 11 — Résultats */}
        <Proof />
      </Suspense>
      <Suspense fallback={null}>
        {/* 12 — Garantie */}
        <Guarantee />
      </Suspense>
      <Suspense fallback={null}>
        {/* 13 — Places limitées */}
        <Spots />
      </Suspense>
      <Suspense fallback={null}>
        {/* 14 — FAQ */}
        <FAQ />
      </Suspense>
      {/* 15 — Footer CTA : rendu par <Layout /> */}
    </Layout>
  );
};

export default Home;
