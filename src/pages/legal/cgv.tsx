import LegalPage from "@/components/sections/legal/legal-page";
import { legalConfig } from "@/utils/legal-config";

const CGVPage = () => (
    <LegalPage
        title="Conditions générales de vente"
        description="Conditions de vente de la formation : prix, paiement, accès, droit de rétractation et remboursement."
        path="/legal/cgv"
    >
        <h2>1. Objet</h2>
        <p>
            Les présentes conditions générales de vente (CGV) encadrent la vente de la formation en ligne
            proposée par {legalConfig.companyName} sur ce site. Toute commande implique l'acceptation
            sans réserve des présentes CGV.
        </p>

        <h2>2. Produits et services</h2>
        <p>
            La formation est un produit numérique composé de modules vidéo et de ressources
            téléchargeables, accessible par abonnement. L'accès est individuel et strictement
            personnel.
        </p>

        <h2>3. Prix et paiement</h2>
        <ul>
            <li>Formation complète : 39,99 € TTC par mois, sans engagement.</li>
        </ul>
        <p>
            L'abonnement est reconduit automatiquement chaque mois et peut être annulé à tout moment ;
            l'annulation prend effet à la fin de la période en cours, sans frais. Les prix sont indiqués
            en euros, toutes taxes comprises. Le paiement s'effectue en ligne via un prestataire de
            paiement sécurisé. Aucune donnée bancaire n'est stockée par l'éditeur du site.
        </p>


        <h2>4. Accès à la formation</h2>
        <p>
            L'accès est transmis par email immédiatement après confirmation du paiement, ou au plus tard
            sous 24 heures. En cas de non-réception, l'acheteur contacte{" "}
            <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>.
        </p>

        <h2>5. Droit de rétractation</h2>
        <p>
            Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation de
            14 jours ne s'applique pas aux contenus numériques fournis immédiatement, dès lors que
            l'acheteur a expressément consenti à l'exécution immédiate et renoncé à son droit de
            rétractation lors de la commande. Ce consentement est recueilli au moment du paiement.
        </p>

        <h2>6. Garantie satisfait ou remboursé 30 jours</h2>
        <p>
            La formation est garantie satisfait ou remboursé pendant 30 jours : si, au terme de ces 30
            jours, l'acheteur n'a pas généré au minimum l'équivalent du prix d'achat qu'il a payé, il est
            intégralement remboursé.
        </p>
        <p>Cette garantie s'applique aux conditions cumulatives suivantes :</p>
        <ul>
            <li>avoir travaillé sur la méthode chaque jour pendant les 30 jours ;</li>
            <li>avoir consommé l'intégralité de la formation (tous les modules et leçons) ;</li>
            <li>
                présenter ses résultats et son avancement (contenus publiés, produit créé, statistiques)
                lors de la demande.
            </li>
        </ul>
        <p>
            La demande se fait par email à{" "}
            <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a> dans les 7 jours suivant la fin
            de la période de 30 jours. Le remboursement est effectué sous 14 jours après validation.
        </p>

        <h2>7. Garantie de résultats</h2>
        <p>
            La formation transmet une méthode et des outils. Aucune garantie de gain, de revenu ou de
            résultat commercial n'est donnée. Les résultats présentés sur le site sont des exemples
            individuels et non une promesse.
        </p>

        <h2>8. Propriété intellectuelle</h2>
        <p>
            Le partage, la revente, la diffusion ou la reproduction des contenus de la formation sont
            interdits et peuvent entraîner la suspension immédiate de l'accès, sans remboursement, ainsi
            que des poursuites.
        </p>

        <h2>9. Droit applicable et litiges</h2>
        <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera
            recherchée en priorité. À défaut, le consommateur peut recourir gratuitement à un médiateur de
            la consommation ou à la plateforme européenne de règlement des litiges{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                ec.europa.eu/consumers/odr
            </a>.
        </p>
    </LegalPage>
);

export default CGVPage;
