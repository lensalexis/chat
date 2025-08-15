import { Row, Heading, Button, Mask, Particle, Text, Column } from "@once-ui-system/core";

export const Cta = () => {
  return (
    <Column fillWidth horizontal="center" borderBottom="neutral-alpha-medium" paddingX="l">
      <Row maxWidth="l" paddingX="56">
        <Row borderTop="neutral-alpha-medium" borderLeft="neutral-alpha-medium" borderRight="neutral-alpha-medium" height="20" fillWidth topRadius="xl"/>
      </Row>
      <Row maxWidth="l" paddingX="24">
        <Row borderTop="neutral-alpha-medium" borderLeft="neutral-alpha-medium" borderRight="neutral-alpha-medium" height="24" fillWidth topRadius="xl"/>
      </Row>
      <Row maxWidth="l" height="m" center paddingX="l" topRadius="xl" gap="24" s={{direction: "column"}} borderTop="neutral-alpha-medium" borderX="neutral-alpha-medium" overflow="hidden">
        <Heading as="h2" align="center" variant="display-strong-m">
          Build the future<Text onBackground="brand-medium">.</Text>
        </Heading>
        <Row position="absolute" minWidth={68} minHeight={28} radius="full" border="brand-alpha-medium"/>
        <Row position="absolute" minWidth={54} minHeight={28} radius="full" border="brand-alpha-medium"/>
        <Row position="absolute" minWidth={40} minHeight={28} radius="full" border="brand-alpha-medium"/>
        <Row position="absolute" minWidth={28} minHeight={28} radius="full" border="brand-alpha-medium" overflow="hidden">
          <Mask fill
            position="absolute"
            x={50}
            y={50}
            radius={25}
            >
            <Particle style={{transform: "scale(1.1)"}} opacity={70} position="absolute" top="0" left="0" fill interactive speed={4} density={100} size="2" interactionRadius={50}/>
          </Mask>
        </Row>
        <Button data-border="rounded" id="hero-cta-button" href="/auth?signup" arrowIcon>
          Start now
        </Button>
      </Row>
    </Column>
  );
};