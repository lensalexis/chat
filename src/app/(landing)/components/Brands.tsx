import { Column, Heading, Text, LogoCloud, Row } from "@once-ui-system/core";

export const Brands = ({ ...flex }: React.ComponentProps<typeof Column>) => (
  <>
    <Column fillWidth horizontal="center" paddingTop="xl" gap="l" {...flex}>
      <Heading as="h2" variant="heading-default-m" align="center" wrap="balance">
        <Text onBackground="neutral-weak" marginRight="8">
          Not just a tool.
        </Text>
        A stack you own and control.
      </Heading>
      <Row fillWidth radius="xl" border="neutral-medium">
        <LogoCloud
          dark
          fillWidth
          columns={3}
          m={{columns: 2}}
          s={{columns: 1}}
          logos={[
            { icon: "/trademarks/icon-dark.svg", wordmark: "/trademarks/wordmark-dark.svg" },
            { icon: "/trademarks/icon-dark.svg", wordmark: "/trademarks/wordmark-dark.svg" },
            { icon: "/trademarks/icon-dark.svg", wordmark: "/trademarks/wordmark-dark.svg" },
          ]}
        />
        <LogoCloud
          light
          columns={3}
          m={{columns: 2}}
          logos={[
            { icon: "/trademarks/icon-light.svg", wordmark: "/trademarks/wordmark-light.svg" },
            { icon: "/trademarks/icon-light.svg", wordmark: "/trademarks/wordmark-light.svg" },
            { icon: "/trademarks/icon-light.svg", wordmark: "/trademarks/wordmark-light.svg" },
          ]}
        />
      </Row>
    </Column>
  </>
);
