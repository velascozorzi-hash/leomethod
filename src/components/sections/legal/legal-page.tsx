import Container from "@/components/container";
import Layout from "@/components/layout";
import LegalHero from "@/components/sections/legal/hero";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";
import { legalConfig } from "@/utils/legal-config";

interface LegalPageProps {
    title: string;
    description: string;
    path: string;
    children: React.ReactNode;
}

const LegalPage = ({ title, description, path, children }: LegalPageProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${title} | ${appConfig.name}`,
        description,
        url: `${appConfig.url}${path}`,
    };

    return (
        <>
            <SEO
                title={`${title} | ${appConfig.name}`}
                description={description}
                canonicalUrl={path}
                ogType="website"
                jsonLd={jsonLd}
            />
            <Layout>
                <LegalHero title={title} description={description} />
                <section>
                    <Container className="md:py-[60px] py-12">
                        <article className="max-w-[840px] mx-auto legal-prose">
                            {children}
                            <p className="text-sm text-muted-foreground mt-10">
                                Dernière mise à jour : {legalConfig.lastUpdate}
                            </p>
                        </article>
                    </Container>
                </section>
            </Layout>
        </>
    );
};

export default LegalPage;
