import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'

import classNames from "classnames";
import { getThemeInitScript } from "@/utils";

import { baseURL, landing, fonts, style, dataStyle } from "@/resources";
import { Meta, Schema,  Column, Flex } from "@once-ui-system/core";
import { Providers } from '@/components';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={landing.home.title}
        description={landing.home.description}
        path={landing.home.path}
      />
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: getThemeInitScript({
              brand: style.brand,
              accent: style.accent,
              neutral: style.neutral,
              solid: style.solid,
              'solid-style': style.solidStyle,
              border: style.border,
              surface: style.surface,
              transition: style.transition,
              scaling: style.scaling,
              'viz-style': dataStyle.variant,
            }),
          }}
        />
      </head>
      <Providers>
        <Column as="body" background="page" fillWidth margin="0" padding="0" style={{ minHeight: "100vh" }}>
          <Column fillWidth horizontal="center" flex={1}>
            {children}
          </Column>
        </Column>
      </Providers>
    </Flex>
  );
}