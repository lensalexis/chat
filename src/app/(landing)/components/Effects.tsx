"use client";

import React from "react";
import { Row, Particle, Background } from "@once-ui-system/core";

export const Effects: React.FC<React.ComponentProps<typeof Row>> = ({ ...flex }) => {
  return (
    <Row
      fill
      position="absolute"
      top="0"
      left="0"
      horizontal="center"
      vertical="center"
      pointerEvents="none"
      {...flex}
    >
      {/* concentric rings */}
      <Row position="absolute" minWidth={74} minHeight={28} radius="full" border="brand-alpha-weak" />
      <Row position="absolute" minWidth={58} minHeight={28} radius="full" border="brand-alpha-weak" />
      <Row position="absolute" minWidth={45} minHeight={28} radius="full" border="brand-alpha-medium" />
      <Row position="absolute" minWidth={35} minHeight={28} radius="full" border="brand-alpha-medium" />

      {/* inner halo + particles */}
      <Row position="absolute" minWidth={28} minHeight={28} radius="full" border="brand-alpha-strong" overflow="hidden">
        <Background
          fill
          position="absolute"
          gradient={{
            display: true,
            x: 50,
            y: 50,
            width: 100,
            height: 60,
            opacity: 100,
            colorStart: "brand-alpha-weak",
            colorEnd: "static-transparent",
          }}
          mask={{ x: 50, y: 50, radius: 25 }}
        >
          <Particle
            style={{ transform: "scale(1.1)" }}
            opacity={70}
            position="absolute"
            top="0"
            left="0"
            fill
            interactive
            speed={4}
            density={100}
            size="1"
            interactionRadius={50}
          />
        </Background>
      </Row>
    </Row>
  );
};

export default Effects;