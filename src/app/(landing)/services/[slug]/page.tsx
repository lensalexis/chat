import { notFound } from "next/navigation";
import {
  Column, Heading, Row, Text, Button, Icon, Grid,
} from "@once-ui-system/core";
import { services } from "@/content/services";

// Important: in Next 15, params is async in dynamic routes
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return notFound();

  return (
    <Column fillWidth fitHeight horizontal="center" gap="64" style={{ paddingTop: "6rem" }}>
      <Row maxWidth="l" m={{ direction: "column" }} gap="xl">
        <Column fillWidth gap="32" >
          <Button
            size="s"
            variant="secondary"
            weight="default"
            prefixIcon="chevronLeft"
            href="/#services"
          >
            Back to services
          </Button>

          <Column gap="16" fillWidth>
            <Heading variant="display-strong-s" marginTop="8">
              {service.title}
            </Heading>
            <Grid columns="2" fillWidth gap="12">
              <Row gap="8" vertical="center">
                <Icon name="refresh" size="s" onBackground="neutral-weak" />
                <Text variant="body-default-s" onBackground="neutral-medium">
                  {service.category}
                </Text>
              </Row>
              <Row gap="8" vertical="center">
                <Icon name="refresh" size="s" onBackground="neutral-weak" />
                <Text variant="body-default-s" onBackground="neutral-medium">
                  {service.timeline}
                </Text>
              </Row>
              <Row gap="8" vertical="center">
                <Icon name="refresh" size="s" onBackground="neutral-weak" />
                <Text variant="body-default-s" onBackground="neutral-medium">
                  {service.price} starting price
                </Text>
              </Row>
            </Grid>
          </Column>

          <Text variant="body-default-l" onBackground="neutral-medium">
            <strong>{service.tagline}</strong><br /><br />
            {service.intro}
          </Text>

          <Column gap="16" fillWidth>
            <Heading variant="heading-strong-l">Perfect for:</Heading>
            <Column gap="8">
              {service.perfectFor.map((item, i) => (
                <Row key={i} gap="12" vertical="center">
                  <Icon name="check" size="s" onBackground="brand-weak" />
                  <Text variant="body-default-s" onBackground="neutral-medium">
                    {item}
                  </Text>
                </Row>
              ))}
            </Column>
          </Column>

          <Column gap="16" fillWidth>
            <Heading variant="heading-strong-l">What you’ll get:</Heading>
            <Column gap="8">
              {service.deliverables.map((item, i) => (
                <Row key={i} gap="12" vertical="center">
                  <Icon name="check" size="s" onBackground="brand-weak" />
                  <Text variant="body-default-s" onBackground="neutral-medium">
                    {item}
                  </Text>
                </Row>
              ))}
            </Column>
          </Column>
        </Column>

        {/* Sticky summary/CTA card */}
        <Column
          fillWidth
          fitHeight
          background="overlay"
          radius="l"
          padding="l"
          border="neutral-alpha-weak"
          style={{ position: "sticky", top: "2rem", alignSelf: "start" }}
        >
          <Column gap="16">
            <Heading variant="heading-strong-l">Package summary</Heading>
            <Row horizontal="between">
              <Text onBackground="neutral-medium">Starting at</Text>
              <Text variant="body-strong-m">{service.price}</Text>
            </Row>
            <Row horizontal="between">
              <Text onBackground="neutral-medium">Typical delivery</Text>
              <Text variant="body-strong-m">{service.timeline}</Text>
            </Row>
            <Button
              fillWidth
              id="order-now"
              arrowIcon
              href="mailto:lens@adlensdigital.com?subject=Project%20Inquiry:%20{service.title}"
            >
              Order now
            </Button>
          </Column>
        </Column>
      </Row>
    </Column>
  );
}