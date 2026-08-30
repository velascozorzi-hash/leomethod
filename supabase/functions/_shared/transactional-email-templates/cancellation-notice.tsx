import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  email?: string
  endsAt?: string
}

const Email = ({ email, endsAt }: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Résiliation abonnement — {email || 'client'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={title}>Un abonnement vient d'être résilié</Heading>
        <Text style={text}>Un client a annulé son abonnement depuis la page « Gérer mon abonnement ».</Text>
        <Section style={box}>
          <Text style={label}>E-mail du client</Text>
          <Text style={value}>{email || '—'}</Text>
          <Text style={label}>Accès actif jusqu'au</Text>
          <Text style={value}>{endsAt || 'fin de période en cours'}</Text>
        </Section>
        <Text style={text}>
          Pense à retirer son accès Skool à cette date (ou dès maintenant si tu préfères).
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) => `Résiliation abonnement — ${data?.email || 'client'}`,
  displayName: 'Notification résiliation (propriétaire)',
  previewData: { email: 'client@example.com', endsAt: '30 septembre 2026' },
  to: 'rapha9390@gmail.com',
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px' }
const title = { fontSize: '22px', color: '#111111' }
const text = { fontSize: '15px', color: '#333333', lineHeight: '22px' }
const box = { backgroundColor: '#f4f4f5', borderRadius: '8px', padding: '16px 20px', margin: '16px 0' }
const label = { fontSize: '12px', color: '#666666', textTransform: 'uppercase' as const, margin: '8px 0 0' }
const value = { fontSize: '16px', color: '#111111', fontWeight: 'bold' as const, margin: '2px 0 8px' }
