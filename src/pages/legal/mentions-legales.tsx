import LegalPage from "@/components/sections/legal/legal-page";
import { legalConfig } from "@/utils/legal-config";

const MentionsLegalesPage = () => (
    <LegalPage
        title="Mentions légales"
        description="Informations sur l'éditeur du site, l'hébergeur et les conditions d'utilisation."
        path="/legal/mentions-legales"
    >
        <h2>Éditeur du site</h2>
        <ul>
            <li>Dénomination : {legalConfig.companyName}</li>
            <li>Forme juridique : {legalConfig.legalForm}</li>
            <li>Adresse : {legalConfig.address}</li>
            <li>SIRET : {legalConfig.siret}</li>
            <li>TVA intracommunautaire : {legalConfig.vat}</li>
            <li>Email : <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a></li>
            <li>Directeur de la publication : {legalConfig.publicationDirector}</li>
        </ul>

        <h2>Hébergeur</h2>
        <p>
            {legalConfig.host.name} — {legalConfig.host.details}
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
            L'ensemble des contenus présents sur ce site (textes, visuels, vidéos, modules de formation,
            documents téléchargeables) est protégé par le droit d'auteur. Toute reproduction, diffusion,
            revente ou partage, total ou partiel, sans autorisation écrite préalable est interdit.
        </p>

        <h2>Responsabilité</h2>
        <p>
            Les informations diffusées sur ce site sont fournies à titre pédagogique. Les résultats
            présentés (captures d'écran, témoignages) sont des cas individuels et ne constituent en aucun
            cas une garantie de revenus. Les résultats dépendent du travail, du marché et de la situation
            propre à chaque personne.
        </p>

        <h2>Contact</h2>
        <p>
            Pour toute question : <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>.
        </p>
    </LegalPage>
);

export default MentionsLegalesPage;
