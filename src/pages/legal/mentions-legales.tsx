import LegalPage from "@/components/sections/legal/legal-page";
import { legalConfig } from "@/utils/legal-config";

const MentionsLegalesPage = () => (
  <LegalPage
    title="Mentions légales"
    description="Informations légales relatives à l'éditeur, à l'hébergement et à l'utilisation du site."
    path="/legal/mentions-legales"
  >
    <p>
      Le site <a href="https://leomethod.app">https://leomethod.app</a> est édité par :
    </p>
    <ul>
      <li>{legalConfig.companyName}, {legalConfig.legalForm}</li>
      <li>SIRET : {legalConfig.siret}</li>
      <li>Adresse : {legalConfig.address}</li>
      <li>Email : <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a></li>
      <li>{legalConfig.vatStatus}</li>
    </ul>

    <h2>Hébergement</h2>
    <ul>
      <li>Hébergement du site : {legalConfig.hosts.site}</li>
      <li>Hébergement des paiements : {legalConfig.hosts.payments}</li>
      <li>Hébergement de la formation : {legalConfig.hosts.formation}</li>
    </ul>
  </LegalPage>
);

export default MentionsLegalesPage;
