"use client";

import { Column, Row, Heading, Input, Text, Button, PasswordInput, MediaUpload, Icon } from "@once-ui-system/core";
import { useState } from "react";

function General() {
  const [name, setName] = useState("Lorant One");
  const [email, setEmail] = useState("lorant@once-ui.com");
  const [password, setPassword] = useState("password");
  const [avatar, setAvatar] = useState("/images/lorant.jpg");

  return (
    <Column fillWidth gap="-1">
      <Row fillWidth gap="20" paddingY="24" paddingLeft="16" paddingRight="24" topRadius="l" border="neutral-alpha-medium" background="surface" s={{direction: "column"}}>
        <Column fillWidth gap="2" vertical="center" paddingLeft="12">
          <Heading variant="heading-strong-xs">
            Avatar
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Upload your public avatar
          </Text>
        </Column>
        <MediaUpload minWidth={4} maxWidth={4} minHeight={4} maxHeight={4} radius="full"
          initialPreviewImage={avatar}
          emptyState={
            <Row gap="4" vertical="center">
              <Icon size="xs" name="plus" />
              <Text variant="label-default-s">Add</Text>
            </Row>
          } />
      </Row>
      <Row fillWidth gap="20" paddingY="24" paddingLeft="16" paddingRight="24" border="neutral-alpha-medium" background="surface" s={{direction: "column"}}>
        <Column fillWidth gap="2" vertical="center" paddingLeft="12">
          <Heading variant="heading-strong-xs">
            Name
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Change your name
          </Text>
        </Column>
        <Row maxWidth={20} vertical="center" gap="8">
          <Input
            id="name"
            height="s"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
          />
          <Button size="s" label="Save"/>
        </Row>
      </Row>
      <Row fillWidth gap="20" paddingY="24" paddingLeft="16" paddingRight="24" border="neutral-alpha-medium" background="surface" s={{direction: "column"}}>
        <Column fillWidth gap="2" vertical="center" paddingLeft="12">
          <Heading variant="heading-strong-xs">
            Email
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Change your email address
          </Text>
        </Column>
        <Row maxWidth={20} vertical="center" gap="8">
          <Input
            id="email"
            height="s"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={20}
          />
          <Button size="s" label="Save"/>
        </Row>
      </Row>
      <Row fillWidth gap="20" paddingY="24" paddingLeft="16" paddingRight="24" border="neutral-alpha-medium" background="surface" s={{direction: "column"}}>
        <Column fillWidth gap="2" vertical="center" paddingLeft="12">
          <Heading variant="heading-strong-xs">
            Password
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Change your password
          </Text>
        </Column>
        <Row maxWidth={20} vertical="center" gap="8">
          <PasswordInput
            id="password"
            height="s"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={20}
          />
          <Button size="s" label="Save"/>
        </Row>
      </Row>
      <Row fillWidth gap="20" paddingY="24" paddingLeft="16" paddingRight="24" bottomRadius="l" border="danger-alpha-medium" background="danger-medium" s={{direction: "column"}}>
        <Column fillWidth gap="2" vertical="center" paddingLeft="12">
          <Heading variant="heading-strong-xs">
            Delete account
          </Heading>
          <Text variant="label-default-s" onBackground="danger-weak">
            Permanently delete your account
          </Text>
        </Column>
        <Button size="s" label="Delete" variant="danger"/>
      </Row>
    </Column>
  );
}

export { General };
