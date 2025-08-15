import { Faq, Plan, Testimonial } from "@/app/(landing)/components";
import { Meta, Schema, Column, Heading, Row, Text } from "@once-ui-system/core";
import { baseURL, landing } from "@/resources";
import { faq, featuredTestimonials, plans, pricing } from "@/content";

export async function generateMetadata() {
  return Meta.generate({
    title: landing.pricing.title,
    description: landing.pricing.description,
    baseURL: baseURL,
    path: landing.pricing.path,
    canonical: landing.pricing.canonical,
    image: landing.pricing.image,
    robots: landing.pricing.robots,
    alternates: landing.pricing.alternates,
  });
}

export default function Pricing() {
  return (
    <Column fillWidth horizontal="center" gap="xl" paddingX="l" paddingY="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={landing.pricing.title}
        description={landing.pricing.description}
        path={landing.pricing.path}
      />
      <Column maxWidth={40} gap="12" horizontal="center">
        <Heading as="h2" align="center" variant="display-strong-m">
          {pricing.title}
        </Heading>
        <Text align="center" onBackground="neutral-medium" variant="body-default-xl" wrap="balance">
          {pricing.description}
        </Text>
      </Column>
      <Row maxWidth="m" gap="8" s={{direction: "column"}}>
        <Plan plan={plans.free} style={{margin: "var(--static-space-16) auto"}}/>
        <Plan plan={plans.pro} style={{margin: "0 auto"}}/>
      </Row>
      <Row fillWidth horizontal="center" paddingX="xl">
        <Testimonial
          maxWidth="s"
          testimonial={featuredTestimonials[0]}
        />
      </Row>
      <Faq maxWidth="m" marginTop="xl"
        items={faq}/>
    </Column>
  );
};
