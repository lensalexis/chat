"use client";

import {
  Avatar,
  Background,
  Column,
  Icon,
  Line,
  Logo,
  NavIcon,
  Option,
  Row,
  SmartLink,
  Text,
  UserMenu,
} from "@once-ui-system/core";
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";

interface HeaderProps {
  avatar?: string;
}

const Header: React.FC<HeaderProps> = ({ avatar }) => {
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const closeOverlay = () => {
    setTimeout(() => {
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      document.dispatchEvent(event);
    }, 0);
  };

  return (
    <Row
      as="header"
      fillWidth
      minHeight="56"
      background="page"
      vertical="center"
      horizontal="between"
      paddingX="24"
      zIndex={1}
    >
      <Row gap="4" vertical="center" minWidth={18}>
        <NavIcon
          hide
          m={{hide: false}}
          isActive={isActive} 
          onClick={handleClick} 
          aria-label="Toggle navigation menu"
          aria-expanded={isActive} />
        <Logo dark icon="/trademarks/icon-dark.svg" wordmark="/trademarks/wordmark-dark.svg" size="s" href="/chat" />
        <Logo light icon="/trademarks/icon-light.svg" wordmark="/trademarks/wordmark-light.svg" size="s" href="/chat" />
      </Row>
        <UserMenu
          avatarProps={{
            empty: !avatar,
            src: avatar,
          }}
          dropdown={
            <Column paddingTop="24" minWidth={14}>
              <Background
                position="absolute"
                left="0"
                right="0"
                top="0"
                bottom="0"
                gradient={{
                  display: true,
                  x: 0,
                  y: -50,
                  colorStart: "brand-background-strong",
                  colorEnd: "static-transparent",
                }}/>
                <Background
                  position="absolute"
                  left="0"
                  right="0"
                  top="0"
                  bottom="0"
                  gradient={{
                    display: true,
                    x: 100,
                    y: -50,
                    colorStart: "accent-background-strong",
                    colorEnd: "static-transparent",
                  }}/>
              <Column fillWidth horizontal="center" gap="2">
                <Avatar size={4} src={avatar} marginBottom="16"/>
                <Text variant="heading-strong-s">
                  Lorant One
                </Text>
                <Text marginBottom="12" variant="label-default-s" onBackground="neutral-weak">
                  Once UI
                </Text>
              </Column>
              <Column fillWidth padding="4" gap="2">
                <Option hasPrefix={<Icon onBackground="neutral-weak" size="s" name="settings" />} label="Settings" value="settings" href="/settings" onClick={closeOverlay} />
              </Column>
              <Line />
              <Column fillWidth padding="4" gap="2">
                <Option hasPrefix={<Icon onBackground="neutral-weak" size="s" name="logout" />} label="Log out" value="logout" href="/auth?login" onClick={closeOverlay} />
              </Column>
            </Column>
          }
        />
      {isActive && (
        <Column
          top="48"
          left="0"
          position="absolute"
          fillWidth
          overflowY="auto"
          padding="8"
          zIndex={1}
          style={{ maxHeight: "calc(100vh - var(--static-space-56))" }}
        >
          <Column
            background="page"
            border="neutral-alpha-medium"
            radius="l"
            gap="4"
          >
            <Sidebar padding="12" />
          </Column>
        </Column>
      )}
    </Row>
  );
};

export { Header };
