import LegalPage from "@/components/sections/legal/legal-page";
import { legalConfig } from "@/utils/legal-config";

const ConfidentialitePage = () => (
    <LegalPage
        title="Politique de confidentialité"
        description="Comment tes données personnelles sont collectées et utilisées, conformément au RGPD."
        path="/legal/confidentialite"
    >
        <h2>Données collectées</h2>
        <p>
            Dans le cadre de l'achat de la formation, les données suivantes sont collectées : nom, email,
            données de paiement (traitées directement par Stripe, jamais stockées par nous).
        </p>

        <h2>Utilisation</h2>
        <p>
            Ces données sont utilisées uniquement pour la livraison de l'accès à la formation et le suivi
            client.
        </p>

        <h2>Sous-traitant</h2>
        <p>Stripe Payments Europe, Ltd. (paiement).</p>

        <h2>Tes droits (RGPD)</h2>
        <p>
            Conformément au RGPD, tu disposes d'un droit d'accès, de rectification et de suppression de tes
            données, à exercer par email à{" "}
            <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>.
        </p>

        <p>Aucune donnée n'est revendue à des tiers.</p>
    </LegalPage>
);

export default ConfidentialitePage;
