"use client";

import { Column, Heading, Row, StylePanel, ToggleButton } from "@once-ui-system/core";
import { useState } from "react";
import { General } from "../components";

export default function SettingsClient() {
  const [tab, setTab] = useState("general");

  return (
    <Column fillWidth horizontal="center" paddingY="32">
      <Column maxWidth="m" gap="m">
        <Row fillWidth paddingX="16">
          <Heading variant="display-strong-s">
            Settings
          </Heading>
        </Row>
        <Row fillWidth gap="24" s={{direction: "column"}}>
          <Column maxWidth={14} s={{direction: "row"}} paddingX="12" gap="4">
            <ToggleButton onClick={() => setTab("general")} selected={tab === "general"} prefixIcon="person" fillWidth horizontal="start">General</ToggleButton>
            <ToggleButton onClick={() => setTab("style")} selected={tab === "style"} prefixIcon="style" fillWidth horizontal="start">Style</ToggleButton>
            <ToggleButton onClick={() => setTab("security")} selected={tab === "security"} prefixIcon="security" fillWidth horizontal="start">Security</ToggleButton>
          </Column>
          {tab === "general" && <General />}
          {tab === "style" && <StylePanel/>}
          {tab === "security" && <Row>Security</Row>}
        </Row>
      </Column>
    </Column>
  );
}