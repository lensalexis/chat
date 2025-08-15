import React from "react";
import { Accordion, Column, Heading, Line, Row, SmartLink, Text } from "@once-ui-system/core";
import { schema } from "@/resources";

interface FaqProps extends React.ComponentProps<typeof Row> {
  items: {
    title: string;
    content: string;
  }[];
}

export const Faq: React.FC<FaqProps> = ({items, ...flex}) => {
  return (
    <Row fillWidth s={{direction: "column"}} gap="24" {...flex}>
      <Column fillWidth paddingTop="24" paddingLeft="16">
          <Heading as="h2" variant="display-strong-l" marginBottom="20">
            Frequently asked questions
          </Heading>
          <Text wrap="balance" onBackground="neutral-medium" variant="body-default-m">
            We've answered some of the most common questions
          </Text>
      </Column>
      <Column fillWidth>
        <Column
          fillWidth
          fitHeight
          radius="l"
          border="neutral-medium"
          overflow="hidden"
          background="surface"
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <Accordion title={<Text variant="body-default-s">{item.title}</Text>}>
                <Text variant="body-default-s" onBackground="neutral-medium">
                  {item.content}
                </Text>
              </Accordion>
              {index !== items.length - 1 && <Line />}
            </React.Fragment>
          ))}
        </Column>
        <Column
          align="center"
          center
          textVariant="body-default-s"
          onBackground="neutral-medium"
          marginTop="20"
          paddingX="24"
          gap="8"
        >
          <Text wrap="balance" marginRight="8">Got more questions? Email us:</Text>
          <SmartLink prefixIcon="email" href={"mailto:" + schema.email}>{schema.email}</SmartLink>
        </Column>
      </Column>
    </Row>
  );
};