"use client";

import { useState } from "react";
import {
  Column, Heading, Row, Text, Button, Icon, Grid, Scroller,
} from "@once-ui-system/core";
import { services } from "@/content/services";

const categories = ["All", "Websites", "Marketing", "SEO", "Design"] as const;

export default function Services(props: React.ComponentProps<typeof Column>) {
  const [selected, setSelected] = useState<(typeof categories)[number]>("All");

  const filtered = services.filter(
    (s) => selected === "All" || s.category === selected
  );

  return (
    <Column fillWidth fitHeight horizontal="center" gap="64" {...props}>
      <Column maxWidth={40} gap="12" horizontal="center">
        <Heading as="h2" align="center" variant="display-strong-m">
          Services
        </Heading>
        <Text align="center" onBackground="neutral-medium" variant="body-default-xl" wrap="balance">
          Choose exactly what you need — Websites, Marketing, SEO, or Design.
        </Text>
      </Column>

      <Column maxWidth="l" gap="32" fillWidth horizontal="center">
        <Scroller fitWidth style={{ maxWidth: "100%" }}>
          <Row fitWidth gap="8">
            {categories.map((c) => (
              <Button
                key={c}
                size="s"
                variant={selected === c ? "primary" : "secondary"}
                weight="default"
                onClick={() => setSelected(c)}
              >
                {c}
              </Button>
            ))}
          </Row>
        </Scroller>

        <Grid fillWidth columns="3" gap="8" s={{ columns: 1 }}>
          {filtered.map((s) => (
            <Column
              key={s.slug}
              fillWidth
              background="overlay"
              radius="l"
              padding="12"
              gap="8"
              vertical="center"
              border="neutral-alpha-weak"
            >
              <Column fillWidth gap="24" padding="20">
                <Column fillWidth gap="4">
                  <Heading variant="heading-strong-l">{s.title}</Heading>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {s.tagline}
                  </Text>
                </Column>

                <Column gap="12">
                  {s.deliverables.slice(0, 4).map((d, i) => (
                    <Row key={i} gap="8" vertical="center">
                      <Icon name="check" size="xs" onBackground="neutral-weak" />
                      <Text variant="body-default-s" onBackground="neutral-medium">
                        {d}
                      </Text>
                    </Row>
                  ))}
                </Column>
              </Column>

              {/* Footer with price + delivery */}
              <Row paddingX="20" paddingBottom="12" horizontal="between">
                <Text onBackground="neutral-medium">{s.timeline}</Text>
                <Text variant="body-strong-m">{s.price}</Text>
              </Row>

              <Button
                fillWidth
                href={`/services/${s.slug}`}
                variant="secondary"
                weight="default"
                arrowIcon
              >
                View details
              </Button>
            </Column>
          ))}
        </Grid>
      </Column>
    </Column>
  );
}