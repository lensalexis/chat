import {
  Button,
  Input,
  Logo,
  Background,
  Column,
  PasswordInput,
  Row,
  Line,
  SmartLink,
  Heading,
  Particle,
  HoloFx,
  Meta,
  Schema,
} from "@once-ui-system/core";

import { baseURL, auth } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: auth.auth.title,
    description: auth.auth.description,
    baseURL: baseURL,
    path: auth.auth.path,
    canonical: auth.auth.canonical,
    image: auth.auth.image,
    robots: auth.auth.robots,
    alternates: auth.auth.alternates,
  });
}

export default function Login() {
  return (
    <Row background="page" fill>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={auth.auth.title}
        description={auth.auth.description}
        path={auth.auth.path}
      />
      <Row fill radius="xl" overflow="hidden">
        <Particle opacity={100} position="absolute" top="0" left="0" fill interactive speed={4} size="1" density={200} interactionRadius={40} pointerEvents="none"/>
        <HoloFx
          fill
          top="0"
          left="0"
          position="absolute"
          texture={{
            opacity: 0,
          }}>
          <Background
            position="absolute"
            top="0"
            left="0"
            gradient={{
              display: true,
              x: 0,
              y: 125,
              colorStart: "accent-solid-strong",
              colorEnd: "static-transparent",
            }}
          />
          <Background
            gradient={{
              display: true,
              x: 125,
              y: 100,
              width: 150,
              height: 150,
              colorStart: "brand-background-strong",
              colorEnd: "static-transparent",
            }}
          />
        </HoloFx>
        <Column fill center padding="16">
          <Column center gap="16" padding="40" maxWidth={32} radius="xl" background="surface">
            <Logo href="/" size="l" dark icon="/trademarks/icon-dark.svg" />
            <Logo href="/" size="l" light icon="/trademarks/icon-light.svg" />
            <Heading marginTop="24" variant="display-strong-xs" align="center">
              Welcome to Agent
            </Heading>
            <Row onBackground="neutral-medium" marginBottom="24" gap="4" align="center">
              Log in or
              <SmartLink href=" ">sign up</SmartLink>
            </Row>
            <Column fillWidth gap="8">
              <Button
                label="Continue with Google"
                fillWidth
                variant="secondary"
                weight="default"
                prefixIcon="google"
                size="l"
              />
              <Button
                label="Continue with GitHub"
                fillWidth
                variant="secondary"
                weight="default"
                prefixIcon="github"
                size="l"
              />
            </Column>
            <Row fillWidth paddingY="24">
              <Row onBackground="neutral-weak" fillWidth gap="24" vertical="center">
                <Line />/<Line />
              </Row>
            </Row>
            <Column gap="-1" fillWidth>
              <Input id="email" placeholder="Email" radius="top" />
              <PasswordInput id="password" placeholder="Password" radius="bottom" />
            </Column>
            <Row paddingX="12" fillWidth>
              <Button type="button" id="login" label="Log in" arrowIcon fillWidth href="/chat" />
            </Row>
          </Column>
        </Column>
      </Row>
    </Row>
  );
};