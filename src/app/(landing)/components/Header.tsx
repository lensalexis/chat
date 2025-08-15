"use client";

import {
  Button,
  Column,
  Fade,
  Logo,
  NavIcon,
  Row,
  ToggleButton,
} from "@once-ui-system/core";
import React, { useState } from "react";

export const Header: React.FC = () => {

  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <Fade height={4} fillWidth to="bottom" position="fixed" top="0" base="transparent" zIndex={2} pointerEvents="none"/>
      <Row
        fillWidth
        horizontal="center"
        paddingTop="8"
        paddingX="m" 
        position="sticky"
        top="0"
        zIndex={2}
      >
        <Row
          as="header"
          border="neutral-alpha-medium"
          maxWidth="l"
          radius="xl"
          paddingLeft="20"
          paddingRight="12"
          paddingY="12"
          vertical="center"
          background="page"
        >
          <Row gap="4" vertical="center">
            <NavIcon
              isActive={isActive} 
              onClick={handleClick} 
              aria-label="Toggle navigation menu"
              aria-expanded={isActive}
              hide
              m={{hide: false}} />
            <Logo brand={{copy: true, url: "/brand"}} dark icon="/trademarks/icon-dark.svg" wordmark="/trademarks/wordmark-dark.svg" size="s" href="/" />
            <Logo light icon="/trademarks/icon-light.svg" wordmark="/trademarks/wordmark-light.svg" size="s" href="/" />
          </Row>
          
            <Row fillWidth vertical="center" horizontal="end">
              <Row
                m={{hide: true}}
                textVariant="label-default-s"
                fillWidth
                gap="4"
                paddingX="l"
                vertical="center"
              >
                <ToggleButton label="Pricing" href="/pricing" />
                <ToggleButton label="About" href="/about" />
                <ToggleButton label="Blog" href="/blog" />
              </Row>
              <Row fitWidth vertical="center" gap="8">
                <Button size="s" variant="secondary" label="Log in" href="/auth?login" />
                <Button size="s" variant="primary" label="Sign up" href="/auth" />
              </Row>
            </Row>
          {isActive && (
            <Column
              top="56"
              left="0"
              position="absolute"
              padding="8"
              gap="4"
              fillWidth
              overflowY="auto"
              style={{ maxHeight: "calc(100vh - var(--static-space-56))" }}
            >
                <ToggleButton fillWidth size="l" label="Pricing" href="/pricing" />
                <ToggleButton fillWidth size="l" label="Blog" href="/blog" />
                <ToggleButton fillWidth size="l" label="About" href="/about" />
            </Column>
          )}
        </Row>
      </Row>
    </>
  );
};