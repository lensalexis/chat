"use client";

import React from "react";
import { Background, Button, Column, HoloFx, Input, Particle, Row, Text } from "@once-ui-system/core";

export const Newsletter: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  return (
    <Column
      overflow="hidden"
      vertical="center"
      fillWidth
      padding="32"
      radius="l"
      horizontal="center"
      align="center"
      border="neutral-alpha-weak"
      shadow="xl"
      {...flex}
    >
      <Particle opacity={70} position="absolute" top="0" left="0" fill interactive speed={4} size="1" density={100} interactionRadius={40} pointerEvents="none"/>
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
      <Column pointerEvents="none" horizontal="center" maxWidth="xs" gap="4">
        <Text variant="heading-strong-xl">
          Join the squad
        </Text>
        <Text
          variant="body-default-s"
          wrap="balance"
          marginBottom="l"
          onBackground="neutral-medium"
        >
          Sign up for news and updates
        </Text>
      </Column>
      <Row maxWidth={16}>
        <Input
          placeholder="Email"
          id="newsletter-email"
          type="email"
          height="s"
          required 
          hasSuffix={
            <Button size="s" style={{marginRight: "-0.5rem"}} id="newsletter-button" arrowIcon>
              Sign up
            </Button>
          }
        />
      </Row>
    </Column>
  );
};