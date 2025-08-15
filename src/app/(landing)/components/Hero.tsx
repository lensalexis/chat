import { Button, Column, Heading } from "@once-ui-system/core";

export const Hero: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  return (
    <Column fillWidth center paddingY="xl" {...flex}>
      <Column maxWidth="xs" horizontal="center" align="center" gap="24">
        <Heading variant="display-strong-l" marginTop="12">
          Set up your own chatbot in minutes
        </Heading>
        <Heading wrap="balance" onBackground="neutral-medium" variant="body-default-xl" marginBottom="16">
          Build your own chatbot in minutes with Magic Agent by Once UI. Just add your API key and you're ready to go.
        </Heading>
        <Button data-border="rounded" id="hero-cta-1" href="/chat" arrowIcon>
          Get Once UI Pro
        </Button>
      </Column>
    </Column>
  );
};