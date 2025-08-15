import {
  Button,
  Column,
  Icon,
  Logo,
  Row,
  SmartLink,
} from "@once-ui-system/core";

export const Footer = () => {
  return (
    <Column fillWidth horizontal="center" paddingY="xl" gap="xl" topRadius="xl" borderTop="neutral-medium">
      <Row fillWidth paddingX="l" maxWidth="l" gap="xl" m={{direction: "column"}}>
        <Column fillWidth vertical="center" gap="40" paddingX="20">
          <Row gap="12" textVariant="label-default-m" maxWidth="l" vertical="center">
            <Logo style={{marginLeft: "-0.125rem"}} dark href="/" icon="/trademarks/icon-dark.svg" size="m" />
            <Logo style={{marginLeft: "-0.125rem"}} light href="/" icon="/trademarks/icon-light.svg" size="m" />
            <Button
              data-border="rounded"
              size="s"
              weight="default"
              variant="tertiary"
              href="https://once-ui.com/products"
            >
              <Row gap="12" vertical="center">
                Launch your stack
                <Icon size="xs" name="arrowUpRight" onBackground="brand-medium" />
              </Row>
            </Button>
          </Row>
          <Row fillWidth horizontal="between" gap="32" textVariant="label-default-s">
            <Row gap="32">
              <SmartLink href="/auth?signup">Sign up</SmartLink>
              <SmartLink href="/pricing">Pricing</SmartLink>
              <SmartLink href="/about">About us</SmartLink>
              <SmartLink href="/blog">Blog</SmartLink>
            </Row>
            <Row gap="32">
              <SmartLink href="/terms-of-use">Terms of Use</SmartLink>
              <SmartLink href="/privacy-policy">Privacy Policy</SmartLink>
            </Row>
          </Row>
        </Column>
      </Row>
    </Column>
  );
};
