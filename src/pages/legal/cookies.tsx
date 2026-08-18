import LegalPage from "@/components/sections/legal/legal-page";
import { legalConfig } from "@/utils/legal-config";

const CookiesPage = () => (
    <LegalPage
        title="Politique de cookies"
        description="Les cookies utilisés sur le site, leur finalité et comment les gérer."
        path="/legal/cookies"
    >
        <h2>Qu'est-ce qu'un cookie ?</h2>
        <p>
            Un cookie est un petit fichier déposé sur ton appareil lors de la visite d'un site. Il permet
            au site de fonctionner correctement et, dans certains cas, de mesurer son audience.
        </p>

        <h2>Cookies utilisés</h2>
        <ul>
            <li>
                <strong>Cookies strictement nécessaires</strong> : session de connexion, sécurité,
                fonctionnement du paiement. Ils ne nécessitent pas de consentement.
            </li>
            <li>
                <strong>Cookies de mesure d'audience</strong> : statistiques de visites anonymisées pour
                améliorer la page.
            </li>
        </ul>
        <p>
            Aucun cookie publicitaire de reciblage n'est déposé sans ton consentement préalable.
        </p>

        <h2>Gérer les cookies</h2>
        <p>
            Tu peux à tout moment supprimer ou bloquer les cookies depuis les réglages de ton navigateur
            (Chrome, Safari, Firefox, Edge). Le blocage des cookies nécessaires peut empêcher l'accès à ton
            espace formation.
        </p>

        <h2>Contact</h2>
        <p>
            Une question sur les cookies ? Écris à{" "}
            <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>.
        </p>
    </LegalPage>
);

export default CookiesPage;
