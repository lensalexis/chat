import { Hero, Effects, Blog, Brands } from "@/app/(landing)/components";
import { Column, Row, Meta, Schema } from "@once-ui-system/core";
import { baseURL, landing } from "@/resources";
import ChatClient from "../(product)/chat/client";

export async function generateMetadata() {
  return Meta.generate({
    title: landing.home.title,
    description: landing.home.description,
    baseURL: baseURL,
    path: landing.home.path,
    canonical: landing.home.canonical,
    image: landing.home.image,
    robots: landing.home.robots,
    alternates: landing.home.alternates,
  });
}

export default function Home() {
  return (
    <Column fillWidth horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={landing.home.title}
        description={landing.home.description}
        path={landing.home.path}
      />
      <Hero maxWidth="xl" paddingX="l" />
      <Effects position="absolute" top="0" left="0" pointerEvents="none"/>
      <Row fillWidth paddingX="l" horizontal="center">
        <Column style={{height: "80vh", maxHeight: "56rem"}} maxWidth="xl" overflow="hidden" background="page" radius="xl" border="neutral-alpha-medium" horizontal="center">
          <ChatClient/>
        </Column>
      </Row>
      <Blog maxWidth="l" paddingX="l" marginY="xl"/>
      <Brands maxWidth="s"/>
    </Column>
  );
}