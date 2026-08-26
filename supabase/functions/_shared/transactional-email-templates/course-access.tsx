import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface CourseAccessProps {
  name?: string
  accessUrl?: string
  planLabel?: string
  buyerEmail?: string
}

export const CourseAccessEmail = ({
  name,
  accessUrl = 'https://www.skool.com/leo-avatar-method-9184',
  planLabel = 'Formation complète',
  buyerEmail,
}: CourseAccessProps) => (
  <Html lang="fr">
    <Head />
    <Preview>Ton accès à la formation est prêt — utilise le MÊME email qu'à l'achat</Preview>
    <Body style={body}>
      <Container style={container}>
        <Heading style={h1}>Bienvenue{name ? ` ${name}` : ''} 👋</Heading>
        <Text style={text}>
          Ton paiement est confirmé. Tu as maintenant accès à <strong>{planLabel}</strong>.
        </Text>
        <Section style={{ textAlign: 'center', margin: '32px 0' }}>
          <Button href={accessUrl} style={button}>
            Accéder à la formation
          </Button>
        </Section>
        <Text style={muted}>
          Si le bouton ne fonctionne pas, copie ce lien dans ton navigateur :<br />
          {accessUrl}
        </Text>

        <Section style={warnBox}>
          <Text style={warnTitle}>⚠️ TRÈS IMPORTANT</Text>
          <Text style={warnBig}>
            UTILISE LE MÊME EMAIL QUE CELUI DE TON ACHAT
          </Text>
          {buyerEmail ? <Text style={warnEmail}>{buyerEmail}</Text> : null}
          <Text style={warnText}>
            Quand tu cliques sur « Accéder à la formation » puis sur <strong>REJOINDRE</strong>,
            Skool te posera une question :<br />
            <strong>« Quel est l'email avec lequel vous avez acheté la formation ? »</strong>
          </Text>
          <Text style={warnText}>
            Tu dois répondre avec <strong>exactement le même email</strong> que celui utilisé pour
            le paiement. Si l'email est différent, <strong>la demande sera refusée</strong>.
          </Text>
        </Section>

        <Hr style={hr} />
        <Text style={text}>
          Mon conseil : commence par le module 1 dès aujourd'hui et avance un module par jour.
          C'est la régularité qui fait les résultats.
        </Text>
        <Text style={muted}>
          Une question ? Réponds simplement à cet e-mail ou écris à velascozorzi@gmail.com.
        </Text>
      </Container>
    </Body>
  </Html>
)


const body = { backgroundColor: '#0b0a12', fontFamily: 'Helvetica, Arial, sans-serif' }
const container = { margin: '0 auto', padding: '32px 24px', maxWidth: '560px' }
const h1 = { color: '#ffffff', fontSize: '26px', fontWeight: '700' as const }
const text = { color: '#d8d5e6', fontSize: '15px', lineHeight: '24px' }
const muted = { color: '#8e8aa3', fontSize: '13px', lineHeight: '20px' }
const button = {
  backgroundColor: '#6c47ff',
  color: '#ffffff',
  borderRadius: '10px',
  padding: '14px 28px',
  fontSize: '15px',
  fontWeight: '600' as const,
  textDecoration: 'none',
}
const hr = { borderColor: '#252238', margin: '28px 0' }

export const template = {
  component: CourseAccessEmail,
  subject: 'Ton accès à la formation est prêt 🚀',
  displayName: 'Accès à la formation',
  previewData: {
    name: 'Léo',
    accessUrl: 'https://www.skool.com/leo-avatar-method-9184',
    planLabel: 'Formation + accompagnement',
  },
} satisfies TemplateEntry
