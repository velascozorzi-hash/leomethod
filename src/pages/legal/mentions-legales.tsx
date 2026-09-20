import LegalPage from "@/components/sections/legal/legal-page";
import { legalConfig } from "@/utils/legal-config";

const MentionsLegalesPage = () => (
  <LegalPage
    title="Mentions légales"
    description="Informations légales relatives à l’éditeur, à l’hébergement et à l’utilisation du site Leo Method."
    path="/legal/mentions-legales"
  >
    <h2>1. Éditeur du site</h2>
    <p>
      Le site Leo Method est édité par {legalConfig.companyName}, {legalConfig.legalForm},
      domicilié à {legalConfig.address} et immatriculé sous le numéro SIRET {legalConfig.siret}.
    </p>
    <p>
      Numéro de TVA intracommunautaire : {legalConfig.vat}.<br />
      Adresse e-mail : <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>.
    </p>

    <h2>2. Directeur de la publication</h2>
    <p>Le directeur de la publication est {legalConfig.publicationDirector}.</p>

    <h2>3. Hébergement</h2>
    <p>
      Le site est hébergé par {legalConfig.host.name}.<br />
      {legalConfig.host.details}.
    </p>

    <h2>4. Propriété intellectuelle</h2>
    <p>
      L’ensemble des textes, vidéos, visuels, ressources, méthodes et contenus disponibles sur ce
      site est protégé par le droit de la propriété intellectuelle. Toute reproduction, diffusion,
      adaptation ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite.
    </p>

    <h2>5. Responsabilité</h2>
    <p>
      Les informations présentées sur ce site sont fournies à titre informatif. L’éditeur s’efforce
      d’en assurer l’exactitude, sans pouvoir garantir l’absence d’erreurs ou d’interruptions. Les
      résultats présentés sont individuels et ne constituent pas une garantie de revenus.
    </p>

    <h2>6. Données personnelles</h2>
    <p>
      Les modalités de collecte et de traitement des données personnelles sont détaillées dans la
      politique de confidentialité accessible en bas du site. Toute demande peut être adressée à
      <a href={`mailto:${legalConfig.email}`}> {legalConfig.email}</a>.
    </p>
  </LegalPage>
);

export default MentionsLegalesPage;