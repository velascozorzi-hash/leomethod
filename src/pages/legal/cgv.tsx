import LegalPage from "@/components/sections/legal/legal-page";
import { legalConfig } from "@/utils/legal-config";

const CGVPage = () => (
    <LegalPage
        title="Conditions générales de vente"
        description="Conditions de vente de l'accompagnement : produit, prix, livraison, rétractation et garantie."
        path="/legal/cgv"
    >
        <h2>Produit vendu</h2>
        <p>
            Accès à la formation en ligne « {legalConfig.formationName} », hébergée sur la plateforme Skool.
        </p>

        <h2>Prix</h2>
        <p>{legalConfig.price}, paiement unique via Stripe.</p>

        <h2>Livraison</h2>
        <p>
            L'accès au groupe et à la formation Skool est envoyé par email à l'adresse fournie lors du
            paiement, immédiatement après validation du paiement par Stripe.
        </p>

        <h2>Droit de rétractation</h2>
        <p>
            Conformément à l'article L221-28 du Code de la consommation, le client reconnaît
            expressément, en validant son paiement, renoncer à son droit de rétractation de 14 jours
            en contrepartie d'un accès immédiat au contenu numérique. Le fait de finaliser l'achat vaut
            acceptation des présentes CGV et de la présente renonciation.
        </p>

        <h2>Garantie « rentable sous 90 jours »</h2>
        <p>
            Le client peut demander un remboursement s'il remplit toutes les conditions suivantes dans un
            délai de 90 jours à compter de l'achat :
        </p>
        <ul>
            <li>avoir suivi l'intégralité de la formation,</li>
            <li>
                avoir sollicité activement l'accompagnement de {legalConfig.companyName} tout au long des
                90 jours,
            </li>
            <li>justifier avoir mis en œuvre la méthode (tentatives, échecs, ajustements),</li>
            <li>ne pas avoir généré au moins 97€ de chiffre d'affaires grâce à la méthode.</li>
        </ul>
        <p>
            La demande doit être adressée à{" "}
            <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a> avant l'expiration du délai de
            90 jours, avec les justificatifs demandés.
        </p>

        <h2>Litiges</h2>
        <p>
            En cas de litige, le client peut recourir à une plateforme de médiation de la consommation.
            Droit français applicable.
        </p>
    </LegalPage>
);

export default CGVPage;
