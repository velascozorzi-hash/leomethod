/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Confirme ton adresse e-mail pour {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirme ton adresse e-mail</Heading>
        <Text style={text}>
          Merci pour ton inscription à{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>{' '}
          !
        </Text>
        <Text style={text}>
          Confirme ton adresse ({recipient}) en cliquant sur le bouton
          ci-dessous :
        </Text>
        <Button style={button} href={confirmationUrl}>
          Confirmer mon e-mail
        </Button>
        <Text style={footer}>
          Si tu n'es pas à l'origine de cette inscription, tu peux ignorer cet
          e-mail. Une question ? velascozorzi@gmail.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

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
const link = { color: '#8b6aff', textDecoration: 'none' }
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
