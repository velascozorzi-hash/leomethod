/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Réinitialise ton mot de passe {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Réinitialise ton mot de passe</Heading>
        <Text style={text}>
          On a reçu une demande de réinitialisation de mot de passe pour ton
          compte {siteName}. Clique sur le bouton ci-dessous pour en choisir un
          nouveau.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Choisir un nouveau mot de passe
        </Button>
        <Text style={footer}>
          Si tu n'as rien demandé, ignore cet e-mail : ton mot de passe reste
          inchangé. Une question ? velascozorzi@gmail.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Inter Tight', Helvetica, Arial, sans-serif",
}
const container = { padding: '32px 28px', maxWidth: '520px' }
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  color: '#0e0e0e',
  margin: '0 0 20px',
}
const text = {
  fontSize: '15px',
  color: '#5a5c66',
  lineHeight: '1.6',
  margin: '0 0 22px',
}
const button = {
  backgroundColor: '#8b6aff',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  borderRadius: '12px',
  padding: '14px 24px',
  textDecoration: 'none',
  display: 'inline-block',
}
const footer = { fontSize: '12px', color: '#9a9aa5', margin: '32px 0 0' }
