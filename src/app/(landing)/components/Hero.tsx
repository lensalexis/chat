import {
  Badge,
  Button,
  Column,
  Heading,
  Mask,
  Row,
  Tag,
  RevealFx,
  AvatarGroup,
  Text,
} from "@once-ui-system/core";
import ChatClient from "@/app/(product)/chat/client";
import { Background4 } from "."; // keep or remove if not used

export const Hero: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  return (
    <Column
      fillWidth
      horizontal="center"
      position="relative"
      overflow="hidden"
      paddingY="xl"                // ⬅️ compact vertical spacing
      {...flex}
    >
      {typeof Background4 !== "undefined" && <Background4 top="0" left="0" />}

      <Row
        maxWidth="xl"
        gap="32"
        m={{ direction: "column" }} // stacks on mobile
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* LEFT: Copy */}
        <Column maxWidth={60} vertical="center" gap="24" paddingRight="32">
          <Badge
            paddingY="4"
            paddingLeft="4"
            paddingRight="16"
            gap="12"
            href="#services"
            textVariant="label-default-s"
            background="overlay"
            border="neutral-alpha-weak"
            arrow={false}
          >
            <Tag><Text variant="body-strong-xs">NEW</Text></Tag>
            Instant presence with AdLens Digital
          </Badge>
          <RevealFx delay={0.3}>
            <Heading variant="display-strong-l" marginTop="12">
              Your Business Deserves More Customers
            </Heading>
          </RevealFx>
    
          <Heading
            wrap="balance"
            onBackground="neutral-medium"
            variant="body-default-l"
            marginBottom="16"
          >
            Take your brand to the next level with digital solutions that solve your biggest challenge.
          </Heading>
          
          <Button data-border="rounded" id="hero-cta-1" href="#services" arrowIcon>
           Explore services
          </Button>
        </Column>
        
        {/* RIGHT: Chat panel (fixed comfortable height on desktop) */}
        <Mask fillWidth radius={150} x={25} y={20}>
          <Column
            fill
            background="page"
            radius="xl"
            border="neutral-alpha-weak"
            overflow="hidden"
            style={{
              height: "520px",        // ⬅️ keeps hero compact; adjust if you want
              maxHeight: "60vh",
            }}
          >
            <ChatClient />
          </Column>
        </Mask>
      </Row>
    </Column>
  );
};