import LegalPage from "@/components/sections/legal/legal-page";
import { legalConfig } from "@/utils/legal-config";

const ConfidentialitePage = () => (
    <LegalPage
        title="Politique de confidentialité"
        description="Comment tes données personnelles sont collectées, utilisées et protégées conformément au RGPD."
        path="/legal/confidentialite"
    >
        <h2>Responsable du traitement</h2>
        <p>
            {legalConfig.companyName}, joignable à{" "}
            <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>.
        </p>

        <h2>Données collectées</h2>
        <ul>
            <li>Identité et contact : prénom, nom, adresse email.</li>
            <li>Données de commande : offre achetée, montant, date (le paiement est traité par notre prestataire de paiement).</li>
            <li>Données de compte : email et identifiants de connexion si tu crées un compte.</li>
            <li>Données de navigation : pages consultées, statistiques d'audience anonymisées.</li>
        </ul>

        <h2>Finalités et bases légales</h2>
        <ul>
            <li>Exécution du contrat : livraison de la formation et support client.</li>
            <li>Obligation légale : facturation et comptabilité.</li>
            <li>Intérêt légitime : sécurité du site et amélioration du service.</li>
            <li>Consentement : envoi d'emails d'information et cookies non essentiels.</li>
        </ul>

        <h2>Durée de conservation</h2>
        <p>
            Les données de commande sont conservées 10 ans (obligation comptable). Les données de contact
            sont conservées 3 ans après le dernier échange. Les données de navigation sont conservées
            13 mois maximum.
        </p>

        <h2>Destinataires</h2>
        <p>
            Les données sont accessibles uniquement à l'éditeur et à ses prestataires techniques :
            hébergeur, prestataire de paiement, service d'envoi d'emails. Aucune donnée n'est vendue.
        </p>

        <h2>Tes droits</h2>
        <p>
            Tu disposes d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et
            de portabilité de tes données. Pour l'exercer, écris à{" "}
            <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>. Tu peux également introduire
            une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
        </p>

        <h2>Sécurité</h2>
        <p>
            Les accès sont protégés par authentification et les échanges sont chiffrés (HTTPS). Les données
            bancaires ne transitent jamais par nos serveurs.
        </p>
    </LegalPage>
);

export default ConfidentialitePage;
