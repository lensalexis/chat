"use client";

import {
  Background,
  Column,
  Flex,
  Row,
  Scroller,
  SmartLink,
  Text,
  User,
} from "@once-ui-system/core";
import { ReactNode } from "react";

interface Testimonial {
  content: ReactNode;
  avatar?: string;
  name?: string;
  role?: string;
  link?: string;
  company?: string;
}

interface Props extends Omit<React.ComponentProps<typeof Flex>, "content"> {
  testimonials: Testimonial[];
}

export const Testimonial1: React.FC<Props> = ({ testimonials, ...flex }) => (
  <Column fillWidth horizontal="center" gap="32">
    <Scroller fitWidth style={{ maxWidth: "100%" }}>
      {/* Important: a single non-wrapping row inside Scroller */}
      <Row fitWidth wrap={false} gap="12" paddingX="12">
        {testimonials.map((t, i) => (
          <Background
            key={i}
            background="surface"
            radius="l"
            border="neutral-medium"
            direction="column"
            vertical="between"
            // Make each card wide enough to overflow the viewport
            minWidth={28}
            // optional: keep heights consistent
            style={{ height: "100%" }}
          >
            <Flex padding="32" fillWidth>
              <Text wrap="balance" variant="heading-default-m">
                {t.content}
              </Text>
            </Flex>

            {(t.role || t.company || t.name) && (
              <Flex borderTop="neutral-medium" fillWidth paddingY="24" paddingX="32">
                <User
                  avatarProps={{ src: t.avatar }}
                  name={t.name}
                  subline={
                    <>
                      {t.role}{" "}
                      {t.link && t.company && (
                        <SmartLink unstyled href={t.link}>
                          {t.company}
                        </SmartLink>
                      )}
                    </>
                  }
                />
              </Flex>
            )}
          </Background>
        ))}
      </Row>
    </Scroller>
  </Column>
);