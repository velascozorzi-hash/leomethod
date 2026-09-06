import LegalPage from "@/components/sections/legal/legal-page";
import { legalConfig } from "@/utils/legal-config";

const RemboursementPage = () => (
    <LegalPage
        title="Conditions de remboursement"
        description="La garantie satisfait ou remboursé 60 jours : conditions à respecter et procédure de demande."
        path="/legal/remboursement"
    >
        <h2>Le principe</h2>
        <p>
            La formation est garantie <strong>satisfait ou remboursé pendant 60 jours</strong>. Si tu
            appliques sérieusement la méthode pendant 60 jours et que tu n'as pas au minimum récupéré le
            prix que tu as payé, je te rembourse intégralement.
        </p>
        <p>
            Rien d'extraordinaire n'est demandé : simplement de faire le travail. La garantie protège les
            personnes qui s'investissent, pas celles qui achètent sans jamais ouvrir la formation.
        </p>

        <h2>Les conditions à respecter</h2>
        <ul>
            <li>Avoir travaillé sur ton projet <strong>chaque jour pendant 60 jours</strong>.</li>
            <li>Avoir <strong>regardé 100 % de la formation</strong>, du premier au dernier module.</li>
            <li>
                Avoir <strong>appliqué la méthode telle qu'elle est enseignée</strong> (niche, avatar IA,
                contenu, offre, produit, système de vente) et non une version approximative ou improvisée.
            </li>
            <li>
                Me <strong>présenter ton travail et tes résultats</strong> : avatar créé, vidéos publiées,
                produit réalisé, page de vente, chiffres obtenus.
            </li>
            <li>
                Faire ta demande <strong>dans les 60 jours</strong> suivant la fin de cette période
                d'application.
            </li>
        </ul>
        <p>
            Si toutes ces conditions sont remplies et que le prix payé n'a pas été récupéré, le
            remboursement est intégral.
        </p>

        <h2>Comment faire ta demande</h2>
        <p>
            Envoie un e-mail à <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a> avec :
        </p>
        <ul>
            <li>l'adresse e-mail utilisée lors de l'achat ;</li>
            <li>le récapitulatif de ce que tu as mis en place jour après jour ;</li>
            <li>les preuves de ton travail (captures de tes vidéos, de ton produit, de tes statistiques).</li>
        </ul>
        <p>
            Je réponds sous 48 h. Une fois la demande validée, le remboursement est effectué sous 14 jours
            sur le moyen de paiement utilisé lors de l'achat.
        </p>

        <h2>Cas exclus</h2>
        <ul>
            <li>Formation non consultée ou consultée partiellement.</li>
            <li>Méthode non appliquée ou appliquée de façon fantaisiste.</li>
            <li>Aucune preuve de travail fournie.</li>
            <li>Partage, revente ou diffusion du contenu de la formation.</li>
        </ul>

        <h2>Une question ?</h2>
        <p>
            Écris-moi à <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a> avant d'acheter si
            un point n'est pas clair. Ces conditions complètent les{" "}
            <a href="/legal/cgv">conditions générales de vente</a>.
        </p>
    </LegalPage>
);

export default RemboursementPage;
