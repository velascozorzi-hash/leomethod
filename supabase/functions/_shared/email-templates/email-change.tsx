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

interface EmailChangeEmailProps {
  siteName: string
  // oldEmail is the user's current address (HookData.OldEmail).
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Confirme ton changement d'adresse e-mail {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirme ton changement d'e-mail</Heading>
        <Text style={text}>
          Tu as demandé à changer l'adresse e-mail de ton compte {siteName} :
          de {oldEmail} vers {newEmail}.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Confirmer le changement
        </Button>
        <Text style={footer}>
          Si tu n'es pas à l'origine de cette demande, sécurise ton compte
          immédiatement et écris-nous à rapha9390@gmail.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail

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
